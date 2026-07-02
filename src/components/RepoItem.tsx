import React, { useState, useRef } from 'react';
import {
  IonItemSliding,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonAlert,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { pencil, trash } from 'ionicons/icons';
import './RepoItem.css';
import { Repository } from '../interfaces/Repository';
import { deleteRepository } from '../services/GitHubService';

interface RepoItemProps extends Repository {
  // Se llama despues de un DELETE exitoso para que Tab1 recargue la lista
  onRepoChange: () => void;
}

const RepoItem: React.FC<RepoItemProps> = (repository) => {
  const history = useHistory();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const closeSliding = () => {
    slidingRef.current?.close();
  };

  // En vez de editar en el mismo item (alert), navegamos a Tab2 en modo edicion,
  // pasando el repositorio completo por el state de la ruta sin funciones (serializable)
  const goToEdit = () => {
    closeSliding();
    const { onRepoChange, ...repoData } = repository;
    // Usamos una ruta propia para editar (en vez de solo "/tab2" con state) para que
    // SIEMPRE se dispare una navegacion real, incluso si ya estabas en el tab2.
    // Ionic no navega si tocas el tab en el que ya estas, y eso dejaba "pegado" el
    // location.state viejo entre cambios de tab.
    history.push(
      `/tab2/edit/${encodeURIComponent(repository.owner.login)}/${encodeURIComponent(repository.name)}`,
      { editRepo: repoData }
    );
  };

  const handleDelete = async () => {
    setProcessing(true);
    setErrorMsg("");

    deleteRepository(repository.owner.login, repository.name)
      .then(() => {
        repository.onRepoChange();
      })
      .catch((error) => {
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(`Error al eliminar el repositorio: ${apiError}`);
      })
      .finally(() => {
        setProcessing(false);
        closeSliding();
      });
  };

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repository.owner.avatar_url} alt={repository.name} />
        </IonThumbnail>
        <IonLabel>
          <h3>{repository.name}</h3>
          <p>{repository.description}</p>
          {repository.language && (
            <p>
              <strong>Lenguaje:</strong>
              {repository.language}
            </p>
          )}
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption
          color="primary"
          disabled={processing}
          onClick={() => setShowEditAlert(true)}
        >
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        <IonItemOption
          color="danger"
          disabled={processing}
          onClick={() => setShowDeleteAlert(true)}
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>

      <IonAlert
        isOpen={showEditAlert}
        cssClass="repo-edit-alert"
        header="Editar repositorio"
        message={`¿Quieres editar el repositorio "${repository.name}"?`}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'repo-edit-alert-cancel',
            handler: () => closeSliding()
          },
          {
            text: 'Editar',
            cssClass: 'repo-edit-alert-confirm',
            handler: () => goToEdit()
          }
        ]}
        onDidDismiss={() => setShowEditAlert(false)}
      />

      <IonAlert
        isOpen={showDeleteAlert}
        cssClass="repo-delete-alert"
        header="Eliminar repositorio"
        message={`¿Seguro que deseas eliminar "${repository.name}"? Esta accion no se puede deshacer.`}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'repo-delete-alert-cancel',
            handler: () => closeSliding()
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            cssClass: 'repo-delete-alert-confirm',
            handler: () => handleDelete()
          }
        ]}
        onDidDismiss={() => setShowDeleteAlert(false)}
      />

      <IonToast
        isOpen={errorMsg !== ""}
        message={errorMsg}
        duration={3000}
        color="danger"
        onDidDismiss={() => setErrorMsg("")}
      />
    </IonItemSliding>
  );
};

export default RepoItem;
