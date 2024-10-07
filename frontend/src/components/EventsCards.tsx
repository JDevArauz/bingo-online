import React from "react";
import { IonCard, IonCardHeader, IonCardContent, IonButton, IonIcon } from "@ionic/react";
import { informationCircleOutline } from 'ionicons/icons';

interface Events {
    id: string;
    name: string;
    description: string;
    date: string;
    hour: string;
    location: string;
    event_type: string;
    state_id: string;
}

interface EventCardProps {
    events: Events[];
    userType: string; // Asegúrate de que esta prop se pase correctamente
}

const EventCard: React.FC<EventCardProps> = ({ events, userType }) => {
    return (
        <>
            {events.map(event => (
                <IonCard key={event.id} className="small-card">
                    <IonCardHeader style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h5 style={{ margin: 0 }}>{event.name}</h5>
                            <IonButton fill="clear" color="medium" style={{ marginLeft: '10px' }}>
                                <IonIcon icon={informationCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>{event.state_id}</p>
                        <p>{event.description}</p>
                        <p>{event.date} - {event.hour}</p>
                        <p>Lugar: {event.location} - {event.event_type}</p>
                        <br />
                        {event.state_id.toLowerCase() === 'activo' && userType === 'admin' && (
                            <IonButton shape="round" color="tertiary">Iniciar</IonButton>
                        )}
                        {event.state_id.toLowerCase() === 'activo' && userType === 'user' && (
                            <IonButton shape="round" color="tertiary">Inscribirse</IonButton>
                        )}
                        {event.state_id.toLowerCase() === 'finalizado' && (
                            <span style={{ color: "red", fontSize: "15px" }}>
                                Evento finalizado
                            </span>
                        )}
                    </IonCardContent>
                </IonCard>
            ))}
        </>
    );
};

export default EventCard;
