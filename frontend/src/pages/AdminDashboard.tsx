// src/pages/AdminDashboard.tsx
import React from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonRippleEffect } from '@ionic/react';
import { personAddOutline, calendarOutline, trophyOutline, peopleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface AdminDashboardProps {
    user: string | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    const history = useHistory();

    // Array de opciones para generar las tarjetas de forma dinámica y limpia
    const adminOptions = [
        { title: 'Agregar Admins', subtitle: 'Registra nuevos administradores.', icon: personAddOutline, path: '/admin_register' },
        { title: 'Gestionar Eventos', subtitle: 'Crea y administra los juegos.', icon: calendarOutline, path: '/events' },
        { title: 'Lista de Ganadores', subtitle: 'Consulta los ganadores.', icon: trophyOutline, path: '/winners' },
        { title: 'Lista de Usuarios', subtitle: 'Visualiza todos los jugadores.', icon: peopleOutline, path: '/users' }
    ];

    return (
        <>
            <div className="ion-text-center ion-margin-bottom">
                <h1 className="text-3xl font-bold">Panel de Administrador</h1>
                <p className="text-lg">Hola, {user || 'Admin'}. ¿Qué deseas hacer hoy?</p>
            </div>

            <IonGrid>
                <IonRow>
                    {adminOptions.map((option, index) => (
                        <IonCol size="12" size-md="6" key={index}>
                            <IonCard
                                className="ion-activatable ripple-parent bingo-card admin-card"
                                onClick={() => history.push(option.path)}
                            >
                                <IonCardHeader>
                                    <IonIcon icon={option.icon} color="secondary" />
                                    <IonCardTitle className="font-bold" color="warning">{option.title}</IonCardTitle>
                                    <IonCardSubtitle color="warning">{option.subtitle}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonRippleEffect />
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </>
    );
};

export default AdminDashboard;