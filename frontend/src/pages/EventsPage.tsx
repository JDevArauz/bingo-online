import React from "react";
import axios from "axios";
import { IonButton, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useAuth } from "../Auth/AuthContext";
import EventsCards from "../components/EventsCards";
import CreateEventModal from "../components/EventsRegister";

const EventsPage: React.FC = () => {
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const { isAuthenticated, role } = useAuth();
    const user_type = role === 'user' ? 'user' : 'admin';

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
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IonTitle>Eventos</IonTitle>
                        {user_type === "admin" ? (
                            <IonButton onClick={() => setShowModal(true)} color="tertiary" shape="round" size="small" style={{ marginRight: '10px' }}>
                                Crear Evento
                            </IonButton>
                        ) : null}
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {events.length === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',width:'100%' }}>
                        <h5>No hay eventos disponibles</h5>
                    </div>
                ) : <EventsCards events={events} userType={user_type} />}
                {/* Pasa el callback handleEventCreated al modal */}
                <CreateEventModal modalOpen={showModal} onClose={() => setShowModal(false)} onEventCreated={handleEventCreated} />
            </IonContent>
        </IonPage>
    );
};

export default EventsPage;