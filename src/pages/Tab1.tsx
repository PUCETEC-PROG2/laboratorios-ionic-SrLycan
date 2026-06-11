import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { repositoryList } from '../interfaces/Repository';
import Repoitem from '../components/Repoitem';

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

        {repositoryList.map((repo) => (
          <Repoitem key={repo.id} {...repo} />
        ))} 

      </IonContent>
    </IonPage>
  );
};

export default Tab1;