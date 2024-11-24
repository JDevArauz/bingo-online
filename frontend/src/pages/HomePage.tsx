import React from "react";
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth/AuthContext";

const HomePage: React.FC = () => {
    const { isAuthenticated, role } = useAuth();
    const history = useHistory();
    const userRole = role === 'user' ? 'Usuario' : 'Admin';
    const user = isAuthenticated ? 'Usuario' : 'Administrador';

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bienvenido!</IonTitle>
                    <IonTitle size="small" style={{ marginTop: '5px' }}>{user}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-text-center bg-gray-100" fullscreen>
                {userRole === 'Admin' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        <div
                            className="bg-purple-600 text-white rounded-lg shadow-lg p-6 hover:bg-purple-500 cursor-pointer"
                            onClick={() => history.push('/admin_register')}
                        >
                            <h2 className="text-xl font-bold">Agregar Administradores</h2>
                            <p className="text-sm">Agrega nuevos administradores.</p>
                        </div>
                        <div
                            className="bg-purple-600 text-white rounded-lg shadow-lg p-6 hover:bg-purple-500 cursor-pointer"
                            onClick={() => console.log('Se agregaran nuevos eventos')}
                        >
                            <h2 className="text-xl font-bold">Crear Nuevos Eventos</h2>
                            <p className="text-sm">Crea nuevos eventos para los usuarios.</p>
                        </div>
                        <div
                            className="bg-purple-600 text-white rounded-lg shadow-lg p-6 hover:bg-purple-500 cursor-pointer"
                            onClick={() => console.log('Ver la lista de Ganadores')}
                        >
                            <h2 className="text-xl font-bold">Lista de Ganadores</h2>
                            <p className="text-sm">Ver los ganadores de los eventos.</p>
                        </div>
                        <div
                            className="bg-purple-600 text-white rounded-lg shadow-lg p-6 hover:bg-purple-500 cursor-pointer"
                            onClick={() => console.log('Ver la lista de Usuarios')}
                        >
                            <h2 className="text-xl font-bold">Lista de Usuarios</h2>
                            <p className="text-sm">Ver la lista de usuarios registrados.</p>
                        </div>
                    </div>
                ) : (
                    <IonText>
                        <h1 className="text-2xl font-bold">¡Hola {user}!</h1>
                        <p className="text-lg">¡Bienvenido a la página de {user}!</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
