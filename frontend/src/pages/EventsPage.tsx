import React from "react";
import axios from "axios";
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useAuth } from "../Auth/AuthContext";
import EventsCards from "../components/EventsCards";
import CreateEventModal from "../components/EventsRegister";
import EmptyState from "../components/EmptyState"; // Importar
import { calendarClearOutline } from 'ionicons/icons'; // Icono para el estado vacío

const EventsPage: React.FC = () => {
    // ... (tus hooks useState, useAuth se mantienen igual)
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const { isAuthenticated, role } = useAuth();
    const user_type = role === 'user' ? 'user' : 'admin';

    // ... (tus funciones fetchEvents y handleEventCreated se mantienen igual)
    const fetchEvents = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST_URL}/api/events`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                setError('Error al cargar los eventos');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    React.useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventCreated = () => {
        setShowModal(false);
        fetchEvents();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Eventos de Bingo</IonTitle>
                    {/* Manera correcta de poner botones en la cabecera en Ionic */}
                    {user_type === "admin" && (
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowModal(true)}>
                                Crear Evento
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* Usamos el componente EmptyState para un mejor feedback visual */}
                {events.length === 0 ? (
                    <EmptyState 
                        icon={calendarClearOutline}
                        title="No hay eventos"
                        message="Parece que no hay eventos programados. ¡Vuelve a intentarlo más tarde!"
                    />
                ) : <EventsCards events={events} userType={user_type} />}

                <CreateEventModal modalOpen={showModal} onClose={() => setShowModal(false)} onEventCreated={handleEventCreated} />
            </IonContent>
        </IonPage>
    );
};

export default EventsPage;