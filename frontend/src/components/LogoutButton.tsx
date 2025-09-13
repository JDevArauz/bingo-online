// src/components/LogoutButton.tsx

import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { IonButton, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import axios from 'axios';

const LogoutButton: React.FC = () => {
    const { logout, user } = useAuth();
    const history = useHistory();

    const apiUrl = `${import.meta.env.VITE_HOST_URL}/api/session/logout`;

    const handleLogout = async () => {
        try {
            await axios.put(apiUrl, {
                user: user
            });

        } catch (error) {
            console.error("Error al cerrar la sesión");
        } finally {
            logout();
            history.push('/login');
        }
    };

    return (
        <IonButton onClick={handleLogout} color="danger">
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar Sesión
        </IonButton>
    );
};

export default LogoutButton;