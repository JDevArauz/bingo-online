import React from "react";
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../Auth/AuthContext";

const HomePage: React.FC = () => {
    const { isAuthenticated, role } = useAuth();
    const history = useHistory();
    const userRole = role === 'user' ? 'Usuario' : 'Admin';
    const user = isAuthenticated ? 'Usuario' : 'Modo de Desarrollo';
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bienvenido !</IonTitle>
                    <IonTitle size="small" style={{ marginTop: '5px' }}>{user}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-text-center" fullscreen>
                {userRole === 'Admin' ? (
                    <>
                        <IonItem detail color='default' style={{ marginTop: '15px', padding: '5px' }} onClick={() => (
                            history.push('/admin_register')
                        )}>
                            <IonLabel>
                                <h2>Agregar Administradores</h2>
                                <p style={{ fontSize: 'small' }}>Agrega nuevos administradores !</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem detail color='default' style={{ marginTop: '15px', padding: '5px' }} onClick={() => (console.log('Se agregaran nuevos eventos'))}>
                            <IonLabel>
                                <h2>Crear nuevos eventos</h2>
                                <p style={{ fontSize: 'small' }}>Crea nuevos eventos para los usuarios !</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem detail color='default' style={{ marginTop: '15px', padding: '5px' }} onClick={() => (console.log('Ver la lista de Ganadores'))}>
                            <IonLabel>
                                <h2>Lista de Ganadores</h2>
                                <p style={{ fontSize: 'small' }}>Ver los ganadores de los eventos !</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem detail color='default' style={{ marginTop: '15px', padding: '5px' }} onClick={() => (console.log('Ver la lista de Usuarios'))}>
                            <IonLabel>
                                <h2>Lista de Usuarios</h2>
                                <p style={{ fontSize: 'small' }}>Ver la lista de usuarios registrados !</p>
                            </IonLabel>
                        </IonItem>

                    </>
                ) : ( 
                    <IonText>
                        <h1>¡Hola {user}!</h1>
                        <p>¡Bienvenido a la página de {user}!</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default HomePage;