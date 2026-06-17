import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList
} from '@ionic/react';
import './Tab1.css';
import { repositoryList } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem'; 

const Tab1: React.FC = () => {
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

        {/* Ahora IonList funcionará correctamente */}
        <IonList>
          {repositoryList.map((repo) => (
            // Usamos repo.name como key temporal ya que tus objetos no tienen id
            <RepoItem key={repo.name} {...repo} /> 
          ))} 
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;