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
  const [error, setError] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true); 
    setError(false);
    
    try {
      const reposData = await fetchRepositories();

      if (reposData.length === 0) {
        setError(true);
      } else {
        setRepositoryList(reposData);
      }
    } catch (err) {
      console.error("Error cargando repositorios:", err);
      setError(true);
    } finally {
      setLoading(false); 
    }
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
              <RepoItem key={repo.name} {...repo} /> 
            ))} 
          </IonList>
        )}


        {!loading && error && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonText color="danger">
              <p style={{ fontWeight: 'bold' }}>No se pudieron cargar los repositorios</p>
            </IonText>
          </div>
        )} 
      </IonContent>
    </IonPage>
  );
};

export default Tab1;