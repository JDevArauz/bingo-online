import React, { useState } from "react";
import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
} from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import axios from "axios";

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
    userType: string;
}

const EventCard: React.FC<EventCardProps> = ({ events, userType }) => {
    const [showModal, setShowModal] = useState<string | null>(null);

    const openModal = (id: string) => {
        setShowModal(id);
    };

    const closeModal = () => {
        setShowModal(null);
    };

    const handleCancelEvent = (
        eventID: string,
        name: string,
        description: string,
        date: string,
        hour: string,
        location: string,
        event_type: string,
        state_id: string
    ) => {
        axios.put(`${import.meta.env.VITE_HOST_URL}/api/events/${eventID}`, {
            id: eventID,
            name,
            description,
            date,
            hour,
            location,
            event_type,
            state_id,  // Se pasa el nuevo state_id (4 para cancelado)
        })
            .then((response) => {
                console.log("Evento cancelado:", response.data);
                closeModal();
            })
            .catch((error) => {
                console.error("Error al cancelar el evento:", error);
            });
    };


    return (
        <>
            {events.map((event) => (
                <IonCard key={event.id} className="small-card">
                    <IonCardHeader
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <h5 style={{ margin: 0 }}>{event.name}</h5>
                            <IonButton
                                fill="clear"
                                color="tertiary"
                                onClick={() => openModal(event.id)}
                                slot="end"
                                style={{ marginleft: "35px" }}
                            >
                                <IonIcon icon={informationCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>Fecha: {event.date}</p>
                        <p>Hora: {event.hour}</p>
                        <p>
                            Lugar: {event.location} - {event.event_type}
                        </p>
                    </IonCardContent>

                    {/* Modal for event details */}
                    <IonModal isOpen={showModal === event.id} onDidDismiss={closeModal}>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>Detalles del Evento</IonTitle>
                                <IonButton
                                    slot="end"
                                    onClick={closeModal}
                                    color="tertiary"
                                    size="small"
                                    shape="round"
                                    style={{ marginRight: "10px" }}
                                >
                                    Cerrar
                                </IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <h2>{event.name}</h2>
                            <div>
                                <p>
                                    <strong>Descripción:</strong>
                                </p>
                                <p>{event.description}</p>
                            </div>
                            <div>
                                <p>
                                    <strong>Fecha:</strong>
                                </p>
                                <p>{event.date}</p>
                            </div>
                            <div>
                                <p>
                                    <strong>Hora:</strong>
                                </p>
                                <p>{event.hour}</p>
                            </div>
                            <div>
                                <p>
                                    <strong>Lugar:</strong>
                                </p>
                                <p>{event.location}</p>
                            </div>
                            <div>
                                <p>
                                    <strong>Tipo de Evento:</strong>
                                </p>
                                <p>{event.event_type}</p>
                            </div>
                            <div>
                                <p>
                                    <strong>Estado:</strong>
                                </p>
                                <p>{event.state_id}</p>
                            </div>
                        </IonContent>
                        <IonFooter>
                            <IonToolbar>
                                {event.state_id.toLowerCase() === "activo" ? (
                                    userType === "admin" ? (
                                        <IonButton shape="round" color="danger" expand="full"
                                            onClick={() => handleCancelEvent(
                                                event.id,
                                                event.name,
                                                event.description,
                                                event.date,
                                                event.hour,
                                                event.location,
                                                event.event_type,
                                                '4' 
                                            )}>
                                            Cancelar Evento
                                        </IonButton>
                                    ) : (
                                        <IonButton shape="round" color="tertiary" expand="full">
                                            Inscribirse
                                        </IonButton>
                                    )
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {userType === "admin" ? (
                                            <IonButton shape="round" color="tertiary" expand="full">
                                                Ver Ganadores
                                            </IonButton>
                                        ) : (
                                            <p style={{ color: "red", fontSize: "15px" }}>
                                                Este evento ha finalizado o fue cancelado
                                            </p>
                                        )}
                                    </div>
                                )}
                            </IonToolbar>
                        </IonFooter>
                    </IonModal>
                </IonCard>
            ))}
        </>
    );
};

export default EventCard;
