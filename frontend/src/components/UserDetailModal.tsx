import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel
} from '@ionic/react';
import { closeCircleOutline, personOutline, mailOutline } from 'ionicons/icons';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface UserDetailModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, isOpen, onClose }) => {
    if (!user) {
        return null;
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Detalles del Usuario</IonTitle>
                    <IonButton slot="end" onClick={onClose} color="danger">
                        <IonIcon icon={closeCircleOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonIcon icon={personOutline} slot="start" />
                    <IonLabel>
                        <h2>Nombre:</h2>
                        <p>{user.name}</p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>
                        <h2>Email:</h2>
                        <p>{user.email}</p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonIcon icon={personOutline} slot="start" />
                    <IonLabel>
                        <h2>Rol:</h2>
                        <p>{user.role}</p>
                    </IonLabel>
                </IonItem>
                {/* Puedes añadir más detalles del usuario si es necesario */}
            </IonContent>
        </IonModal>
    );
};

export default UserDetailModal;