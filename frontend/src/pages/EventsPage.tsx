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

    React.useEffect(() => {
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
    }, []);

    const eventTest = [
        {
            id: '1',
            name: 'Evento 1',
            description: 'Descripción del evento 1',
            date: '2022-01-01',
            hour: '10:00',
            location: 'Lugar 1',
            event_type: 'Presencial',
            state_id: 'Activo'
        },
        {
            id: '2',
            name: 'Evento 2',
            description: 'Descripción del evento 2',
            date: '2022-02-02',
            hour: '11:00',
            location: 'Lugar 2',
            event_type: 'Virtual',
            state_id: 'Finalizado'
        },
        {
            id: '3',
            name: 'Evento 3',
            description: 'Descripción del evento 3',
            date: '2022-03-03',
            hour: '12:00',
            location: 'Lugar 3',
            event_type: 'Presencial',
            state_id: 'Activo'
        },
        {
            id: '4',
            name: 'Evento 4',
            description: 'Descripción del evento 4',
            date: '2022-04-04',
            hour: '13:00',
            location: 'Lugar 4',
            event_type: 'Virtual',
            state_id: 'Activo'
        },
        {
            id: '5',
            name: 'Evento 5',
            description: 'Descripción del evento 5',
            date: '2022-05-05',
            hour: '14:00',
            location: 'Lugar 5',
            event_type: 'Presencial',
            state_id: 'Finalizado'
        }
    ];

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
                <EventsCards events={eventTest} userType={user_type} />
                {/* Añadido el onClose correctamente */}
                <CreateEventModal modalOpen={showModal} onClose={() => setShowModal(false)} />
            </IonContent>
        </IonPage>
    );
};

export default EventsPage;