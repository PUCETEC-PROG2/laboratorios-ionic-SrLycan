import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonText, IonToast, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { Repository } from '../interfaces/Repository';
import './Tab2.css';
import { createRepository, updateRepository } from '../services/GitHubService';
import LoadingSpinner from '../components/LoadingSpinner';

const REPO_NAME_REGEX = /^[A-Za-z0-9._-]+$/;

interface Tab2LocationState {
  editRepo?: Repository;
}

interface Tab2RouteParams {
  owner?: string;
  repo?: string;
}

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<Tab2LocationState>();
  const params = useParams<Tab2RouteParams>();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: ""
  });
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isEditMode = editingRepo !== null;


  const isEditRoute = Boolean(params.owner && params.repo);

  useIonViewWillEnter(() => {
    const repoToEdit = location.state?.editRepo;
    if (isEditRoute && repoToEdit) {
      setEditingRepo(repoToEdit);
      setRepositoryData({
        name: repoToEdit.name,
        description: repoToEdit.description ?? ""
      });
    } else {
      setEditingRepo(null);
      setRepositoryData({ name: "", description: "" });
    }
    setErrorMsg("");
  });

  const validateRepoData = (): string | null => {
    const name = repositoryData.name.trim();

    if (!name) {
      return "El nombre del repositorio es obligatorio";
    }
    if (name.length > 100) {
      return "El nombre del repositorio no puede superar los 100 caracteres";
    }
    if (!REPO_NAME_REGEX.test(name)) {
      return "El nombre solo puede contener letras, numeros, puntos, guiones y guiones bajos";
    }
    if (repositoryData.description && repositoryData.description.length > 350) {
      return "La descripcion no puede superar los 350 caracteres";
    }
    return null;
  };

  const saveRepo = async () => {
    const validationError = validateRepoData();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const wasEditMode = isEditMode;

    const payload = {
      name: repositoryData.name.trim(),
      description: repositoryData.description.trim()
    };

    const request = wasEditMode && editingRepo
      ? updateRepository(editingRepo.owner.login, editingRepo.name, payload)
      : createRepository(payload);

    request
      .then(() => {
        setSuccessMessage(
          wasEditMode
            ? "Repositorio actualizado exitosamente"
            : "Repositorio creado exitosamente"
        );
        setShowSuccessToast(true);
        setRepositoryData({ name: "", description: "" });
        setEditingRepo(null);
        history.push("/tab1");
      })
      .catch((error) => {
        const apiError = error instanceof Error ? error.message : String(error);
        const action = wasEditMode ? "editar" : "crear";
        setErrorMsg(`Error al ${action} el repositorio: ${apiError}`);
      })
      .finally(() => setLoading(false));
  };

  const pageTitle = isEditMode ? "Editar repositorio" : "Formulario de Repositorio";
  const buttonLabel = isEditMode ? "Editar" : "Crear repositorio";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditMode ? "Editar repositorio" : "Formulario del repositorio"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={repositoryData.name}
            onIonChange={(e) => setRepositoryData({...repositoryData, name: e.detail.value ?? ""})}
          />
          <IonTextarea
            className='form-field'
            label='Descripción del repositorio'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            value={repositoryData.description}
            onIonChange={(e) => setRepositoryData({...repositoryData, description: e.detail.value ?? ""})}
            rows={6}
          />
          {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText> }  
          <IonButton
            className='form-field'
            expand='block'
            color="dark"
            shape="round"
            disabled={loading}
            onClick={saveRepo}
          >
            {buttonLabel}
          </IonButton>
          {isEditMode && (
            <IonButton
              className='form-field'
              expand='block'
              fill="outline"
              color="medium"
              shape="round"
              disabled={loading}
              onClick={() => {
                setEditingRepo(null);
                setRepositoryData({ name: "", description: "" });
                history.push("/tab2");
              }}
            >
              Cancelar
            </IonButton>
          )}
        </div>
        {loading && <LoadingSpinner />}

        <IonToast
          isOpen={showSuccessToast}
          message={successMessage}
          duration={2000}
          color="success"
          onDidDismiss={() => setShowSuccessToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
