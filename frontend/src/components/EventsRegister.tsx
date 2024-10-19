import React, { useEffect, useState } from "react";
import {
    IonModal,
    IonButton,
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonToast,
} from "@ionic/react";
import axios from "axios";

interface Event {
    name: string;
    description: string;
    date: string;
    hour: string;
    location: string;
    event_type: string;
    state_id: string;
}

interface CreateEventModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onEventCreated: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ modalOpen, onClose, onEventCreated }) => {
    const [showModal, setShowModal] = useState(modalOpen);
    const [newEvent, setNewEvent] = useState<Event>({
        name: '',
        description: '',
        date: '',
        hour: '',
        location: '',
        event_type: 'Presencial',
        state_id: '1'
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setShowModal(modalOpen);
    }, [modalOpen]);

    const handleInputChange = (e: CustomEvent) => {
        const { name, value } = e.target as HTMLInputElement;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleEventTypeChange = (value: string) => {
        setNewEvent({ ...newEvent, event_type: value });
    };

    const handleSubmit = () => {
        axios.post(`${import.meta.env.VITE_HOST_URL}/api/events`, newEvent)
            .then(response => {
                setShowToast(true);
                setNewEvent({
                    name: '',
                    description: '',
                    date: '',
                    hour: '',
                    location: '',
                    event_type: 'Presencial',
                    state_id: '1'
                }); // Reset form
                onEventCreated();
            })
            .catch(error => {
                console.log(error);
            });
        onClose();
    };

    return (
        <>
            <IonModal isOpen={showModal} onDidDismiss={onClose}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nuevo Evento</IonTitle>
                        <IonButton slot="end" onClick={onClose} color="danger" shape="round" style={{ marginRight: '10px' }}>
                            Cancelar
                        </IonButton>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding" style={{ overflow: "hidden" }}>
                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Nombre del Evento</IonLabel>
                        <IonInput
                            name="name"
                            value={newEvent.name}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>

                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Descripción</IonLabel>
                        <IonTextarea
                            name="description"
                            value={newEvent.description}
                            onIonChange={handleInputChange}
                            required
                            autoGrow
                        />
                    </IonItem>

                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Fecha</IonLabel>
                        <IonInput
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>

                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Hora</IonLabel>
                        <IonInput
                            type="time"
                            name="hour"
                            value={newEvent.hour}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>

                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Lugar</IonLabel>
                        <IonInput
                            name="location"
                            value={newEvent.location || 'No especificado'}
                            onIonChange={handleInputChange}
                            required
                        />
                    </IonItem>

                    <IonItem lines="full" style={{ marginBottom: '20px' }}>
                        <IonLabel position="stacked">Tipo de Evento</IonLabel>
                        <IonSelect
                            value={newEvent.event_type}
                            onIonChange={(e: any) => handleEventTypeChange(e.detail.value)}
                        >
                            <IonSelectOption value="Presencial">Presencial</IonSelectOption>
                            <IonSelectOption value="Virtual">Virtual</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonContent>
                <IonFooter className="ion-padding">
                    <IonButton
                        expand="full"
                        onClick={handleSubmit}
                        color="tertiary"
                        shape="round"
                    >
                        Crear Evento
                    </IonButton>
                </IonFooter>
            </IonModal>

            <IonToast
                isOpen={showToast}
                message="Evento creado exitosamente"
                duration={2000}
                onDidDismiss={() => setShowToast(false)}
            />
        </>
    );
};

export default CreateEventModal;