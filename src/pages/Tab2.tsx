import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import './Tab2.css';
import { createRepository } from '../services/GitHubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const saveRepo = async () => {  
    if (!repositoryData.name || repositoryData.name.trim() === ''){
      setErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    createRepository(repositoryData)
      .then(() => history.push("/tab1"))
      .catch((error) => {
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(`Error al crear el repositorio: ${apiError}`);
      })
      .finally(() => 
        setLoading(false));
        setRepositoryData ({
          name: "",
          description: ""
        })
  
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario del repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
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
            onClick={saveRepo}
          >
            Guardar
          </IonButton>
        </div>
        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;