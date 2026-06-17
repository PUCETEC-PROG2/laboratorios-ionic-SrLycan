import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, // <-- ¡FALTA IMPORTAR ESTE COMPONENTE!
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className='card'>
            <img src="https://avatars.githubusercontent.com/u/211136897?v=4" alt="SrLycan" />
            <IonCardHeader>
              <IonCardTitle>Dennys Vela</IonCardTitle>
              <IonCardSubtitle>SrLycan</IonCardSubtitle>
            </IonCardHeader>
            
            <IonCardContent>
              Desarrollador de Software pro pro max xd
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;