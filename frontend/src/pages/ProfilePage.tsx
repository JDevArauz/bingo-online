// src/pages/ProfilePage.tsx
import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import { personCircleOutline, mailOutline, logOutOutline, businessOutline } from 'ionicons/icons';
import { useAuth } from '../Auth/AuthContext';
import { useHistory } from 'react-router-dom';
import AccessDenied from '../components/AccessDenied';
import LogoutButton from '../components/LogoutButton';

const ProfilePage: React.FC = () => {
    // Obtenemos el email del contexto
    const { isAuthenticated, name, email, role } = useAuth();
    const history = useHistory();

    if (!isAuthenticated) {
        return <AccessDenied message="Para ver tu perfil, por favor, inicia sesión." />;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mi Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                <div className="ion-text-center">
                    <IonIcon icon={personCircleOutline} style={{ fontSize: '100px', color: '#8b5cf6' }} />
                    <h1 className="text-3xl font-bold">{name || 'Usuario'}</h1>
                    <p className="text-lg text-gray-500">{role || 'Rol no definido'}</p>
                </div>

                <IonCard className="bingo-card user-card ion-margin-top">
                    <IonCardHeader>
                        <IonCardTitle>Información General</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem lines="none" className="ion-no-padding">
                            <IonIcon icon={personCircleOutline} slot="start" />
                            <IonLabel>
                                <h3 className="font-semibold">Nombre:</h3>
                                <p>{name || 'No disponible'}</p>
                            </IonLabel>
                        </IonItem>
                        {/* Mostramos el email */}
                        <IonItem lines="none" className="ion-no-padding">
                            <IonIcon icon={mailOutline} slot="start" />
                            <IonLabel>
                                <h3 className="font-semibold">Email:</h3>
                                <p>{email || 'No disponible'}</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="none" className="ion-no-padding">
                            <IonIcon icon={businessOutline} slot="start" />
                            <IonLabel>
                                <h3 className="font-semibold">Rol:</h3>
                                <p>{role || 'No disponible'}</p>
                            </IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                <IonGrid className="ion-margin-top">
                    <IonRow>
                        <IonCol size="12">
                            <LogoutButton />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;