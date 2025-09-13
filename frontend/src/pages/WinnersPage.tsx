import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner
} from '@ionic/react';
import { trophyOutline } from 'ionicons/icons';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import AccessDenied from '../components/AccessDenied';
import EmptyState from '../components/EmptyState';

interface Winner {
    id: string;
    winnerName: string;
    eventName: string;
    winningDate: string;
}

const WinnersPage: React.FC = () => {
    const { isAuthenticated, role } = useAuth();
    const [winners, setWinners] = useState<Winner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchWinners = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/winners`);
            setWinners(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar la lista de ganadores.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && role === 'Admin') {
            fetchWinners();
        }
    }, [isAuthenticated, role]);

    if (!isAuthenticated || role !== 'Admin') {
        return <AccessDenied message="Esta página es solo para administradores." />;
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ganadores de Bingo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                {loading && <IonSpinner name="dots" className="ion-text-center" />}
                {error && <p className="ion-text-center ion-padding">{error}</p>}
                {!loading && !error && winners.length === 0 && (
                    <EmptyState
                        title="No hay ganadores"
                        message="Aún no hay ganadores registrados en el sistema."
                    />
                )}
                {!loading && !error && winners.length > 0 && (
                    <IonList>
                        {winners.map(winner => (
                            <IonItem key={winner.id}>
                                <IonIcon icon={trophyOutline} slot="start" />
                                <IonLabel>
                                    <h2>{winner.winnerName}</h2>
                                    <p>Evento: {winner.eventName}</p>
                                    <p>Fecha: {formatDate(winner.winningDate)}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default WinnersPage;