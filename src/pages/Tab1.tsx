import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  useIonViewWillEnter,
  IonText
} from '@ionic/react';
import './Tab1.css';
import { Repository } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem'; 
import { fetchRepositories } from '../services/GitHubService';
import LoadingSpinner from '../components/LoadingSpinner'; 

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepos = async () => {
    setLoading(true); 
    setErrorMsg("");
    
    fetchRepositories()
      .then((reposData) => setRepositoryList(reposData))
      .catch((error) => {
        console.error(error);
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(`Error al cargar repositorios: ${apiError}`);
      })
      .finally(() => setLoading(false));
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader> 
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <LoadingSpinner />}

        {!loading && repositoryList.length > 0 && (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem key={repo.name} {...repo} onRepoChange={loadRepos} />
            ))} 
          </IonList>
        )}

        {!loading && errorMsg && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonText color="danger">
              <p style={{ fontWeight: 'bold' }}>{errorMsg}</p>
            </IonText>
          </div>
        )} 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;