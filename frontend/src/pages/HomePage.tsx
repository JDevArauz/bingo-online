import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useAuth } from '../Auth/AuthContext';
import AdminDashboard from './AdminDashboard'; // Componente para el admin
import UserDashboard from './UserDashboard';   // Componente para el usuario
import './HomePage.css'; // Estilos compartidos para los paneles

const HomePage: React.FC = () => {
    const { name, role } = useAuth();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bingo Online</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                {/* Renderizado condicional basado en el rol del usuario */}
                {role === 'Administrador' ? ( 
                    <AdminDashboard user={name} />
                ) : (
                    <UserDashboard user={name} />
                )}
            </IonContent>
        </IonPage>
    );
};

export default HomePage;