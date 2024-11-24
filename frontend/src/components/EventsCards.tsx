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
import { informationCircleOutline, calendarOutline, timeOutline, locationOutline, closeCircleOutline } from "ionicons/icons";
import axios from "axios";

interface Events {
    id: string;
    name: string;
    description: string;
    date: string;
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
    function formatDate(fecha : string) {
        // Crear un objeto Date a partir de la fecha en formato ISO 8601
        const date = new Date(fecha);
    
        // Formatear la fecha en formato "9 de enero de 2024"
        const formattedDate = new Intl.DateTimeFormat('es-CR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC', // Especificar la zona horaria UTC
        }).format(date);

        // Formatear la hora en formato de 12 horas con AM/PM
        const formattedTime = new Intl.DateTimeFormat('es-CR', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC', // Especificar la zona horaria UTC
        }).format(date);

        return { formattedDate, formattedTime };
    }

    const handleCancelEvent = (
        eventID: string,
        name: string,
        description: string,
        date: string,
        location: string,
        event_type: string,
        state_id: string
    ) => {
        axios.put(`${import.meta.env.VITE_HOST_URL}/api/events/${eventID}`, {
            id: eventID,
            name,
            description,
            date,
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
        <IonCard key={event.id} className="bg-morado text-blanco shadow-lg rounded-lg mb-4">
          <IonCardHeader className="flex justify-between items-center">
  <div className="w-full flex justify-end">
    <h5 className="w-full flex justify-center text-xl font-semibold text-white">
      {event.name}
    </h5>
    <IonButton
      size="small"
      shape="round"
      className="text-white py-2 px-2"
      onClick={() => openModal(event.id)}
    >
      <IonIcon icon={informationCircleOutline} />
      <p className="text-sm font-semibold text-white capitalize">Detalles</p>
    </IonButton>
  </div>
</IonCardHeader>
          <IonCardContent>
            {(() => {
              const { formattedDate, formattedTime } = formatDate(event.date);
              return (
                <>
                    <div className="flex items-center">
                    <IonIcon icon={calendarOutline} className="mr-2" />
                    <p>Fecha: {formattedDate}</p>
                    </div>
                    <div className="flex items-center">
                    <IonIcon icon={timeOutline} className="mr-2" />
                    <p>Hora: {formattedTime}</p>
                    </div>
                    <div className="flex items-center">
                    <IonIcon icon={locationOutline} className="mr-2" />
                    <p>
                        Lugar: {event.location} - {event.event_type}
                    </p>
                    </div>
                </>
              );
            })()}
          </IonCardContent>

          {/* Modal for event details */}
          <IonModal isOpen={showModal === event.id} onDidDismiss={closeModal}>
              <IonToolbar >
              <div className="bg-purple-600 rounded w-full flex justify-end">
                <h5 className="w-full flex justify-center text-xl font-semibold mt-3 text-white">
                {event.name}
                </h5>
                <IonButton
                shape="round"
                size="small"
                onClick={closeModal}
                >
                <IonIcon icon={closeCircleOutline} />
                <p className="text-sm font-semibold text-white capitalize">Cerrar</p>
                </IonButton>
            </div>
              </IonToolbar> 
            <IonCard className="bg-white shadow-md rounded-lg overflow-hidden">            
                <IonCardContent className="p-4">
                    <div className="space-y-2">
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Descripción:</p>
                        <p className="text-gray-900">{event.description}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Fecha:</p>
                        <p className="text-gray-900">{formatDate(event.date).formattedDate}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Hora:</p>
                        <p className="text-gray-900">{formatDate(event.date).formattedTime}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Lugar:</p>
                        <p className="text-gray-900">{event.location}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Tipo de Evento:</p>
                        <p className="text-gray-900">{event.event_type}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Estado:</p>
                        <p className="text-gray-900">{event.state_id}</p>
                    </div>
                    </div>
                </IonCardContent>
            </IonCard>
            <IonFooter>
              <IonToolbar>
                {event.state_id.toLowerCase() === 'activo' ? (
                  userType === 'admin' ? (
                    <IonButton
                      shape="round"
                      color="danger"
                      expand="full"
                      onClick={() =>
                        handleCancelEvent(
                          event.id,
                          event.name,
                          event.description,
                          event.date,
                          event.location,
                          event.event_type,
                          '4'
                        )
                      }
                    >
                      Cancelar Evento
                    </IonButton>
                  ) : (
                    <IonButton shape="round" color="tertiary" expand="full">
                      Inscribirse
                    </IonButton>
                  )
                ) : (
                  <div className="flex justify-center w-full">
                    {userType === 'admin' ? (
                      <IonButton shape="round" color="tertiary" expand="full">
                        Ver Ganadores
                      </IonButton>
                    ) : (
                      <p className="text-red-500 text-sm">
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
