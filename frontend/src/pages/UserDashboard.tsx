// src/pages/UserDashboard.tsx
import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonRippleEffect } from '@ionic/react';
import { gameControllerOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface UserDashboardProps {
    user: string | null;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
    const history = useHistory();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-3xl font-bold">¡Bienvenido, {user || 'jugador'}!</h1>
            <p className="text-lg mt-2">¿Listo para la diversión?</p>

            <IonCard
                className="ion-activatable ripple-parent bingo-card user-card ion-margin-top w-full max-w-md"
                onClick={() => history.push('/events')}
            >
                <IonCardHeader>
                    <IonIcon icon={gameControllerOutline} />
                    <IonCardTitle className="text-2xl font-bold">Ver Eventos de Bingo</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p className="text-md mt-2">¡Busca una partida y únete a la emoción!</p>
                </IonCardContent>
                <IonRippleEffect />
            </IonCard>
        </div>
    );
};

export default UserDashboard;