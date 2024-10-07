import React from "react";
import axios from "axios";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import EventsCards from "../components/EventsCards";


const EventsPage: React.FC = () => {
    const [events, setEvents] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const user = 'admin';

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Eventos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <EventsCards events={events} userType={user} />
            </IonContent>
        </IonPage>
    );
};

export default EventsPage;