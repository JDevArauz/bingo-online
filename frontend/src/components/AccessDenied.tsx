import React from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { closeCircleSharp } from 'ionicons/icons';

interface AccessDeniedProps {
    title?: string;
    message: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ title = "Acceso Denegado", message }) => {
    return (
        <IonPage>
            <IonContent className="ion-text-center ion-padding" fullscreen>
                <div className="empty-state">
                    <IonIcon icon={closeCircleSharp} color="danger" style={{ fontSize: "120px" }} />
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AccessDenied;