import React, { useState, useEffect } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import AccessDenied from '../components/AccessDenied';
import EmptyState from '../components/EmptyState';
import UserDetailModal from '../components/UserDetailModal'; // Lo crearemos en el siguiente paso

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

const UsersPage: React.FC = () => {
    const { isAuthenticated, role } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/users`);
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar la lista de usuarios.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && role === 'Administrador') {
            fetchUsers();
        }
    }, [isAuthenticated, role]);

    if (!isAuthenticated || role !== 'Administrador') {
        return <AccessDenied message="Esta página es solo para administradores." />;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Lista de Usuarios</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                {loading && <IonSpinner name="dots" className="ion-text-center" />}
                {error && <p className="ion-text-center ion-padding">{error}</p>}
                {!loading && !error && users.length === 0 && (
                    <EmptyState
                        title="No hay usuarios"
                        message="No se encontraron usuarios registrados en el sistema."
                    />
                )}
                {!loading && !error && users.length > 0 && (
                    <IonList>
                        {users.map(user => (
                            <IonItem 
                                key={user.id} 
                                button 
                                onClick={() => setSelectedUser(user)}
                                detail={true}
                            >
                                <IonIcon icon={personCircleOutline} slot="start" />
                                <IonLabel>
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                    <p>Rol: {user.role}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
            {selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    isOpen={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </IonPage>
    );
};

export default UsersPage;