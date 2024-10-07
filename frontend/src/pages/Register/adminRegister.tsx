import React, { useState, useRef } from 'react';
import { personAddOutline, eyeOffOutline, eyeOutline, closeCircleSharp, personAddSharp } from 'ionicons/icons';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { useAuth } from '../../Auth/AuthContext';
import axios from 'axios';

const AdminRegister: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dni_id, setDni_id] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const { isAuthenticated,role } = useAuth();
    const rol = role || 'SuperAdmin';

    const toggleShowPassword = async () => {
        const input = await passwordInputRef.current?.getInputElement();
        if (input) {
            input.type = showPassword ? "password" : "text";
        }
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        if (name === "" || email === "" || password === "" || dni_id === "") {
            setErrorMessage("Por favor, complete todos los campos");
            setShowToast(true);
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/register`, {
                name: name,
                email: email,
                password: password,
                dni_id: dni_id,
                role_id: '1'
            });
            if (res.status === 200) {
                setShowSuccessToast(true);
            } else {
                setErrorMessage("Error al registrar el usuario");
                setShowToast(true);
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || "Ocurrió un error desconocido. Por favor, intente de nuevo.";
            setErrorMessage(errorMsg);
            setShowToast(true);
        }
    };
    
    if (isAuthenticated) {
        return (
            <IonPage>
                <IonContent className="ion-text-center" fullscreen>
                    <IonIcon icon={closeCircleSharp} color="danger" style={{ fontSize: "185px", marginTop:'25%' }} />
                    <h1>Acceso Denegado</h1>
                    <p>Para acceder a esta página <br /> por favor inicie sesión.</p>
                </IonContent>
            </IonPage>
        )
    }

    if (rol !== 'SuperAdmin') {
        return (
            <IonPage>
                <IonContent className="ion-text-center" fullscreen>
                    <IonIcon icon={closeCircleSharp} color="danger" style={{ fontSize: "185px", marginTop:'25%' }} />
                    <h1>Acceso Denegado</h1>
                    <p>Esta página es solo <br /> para administradores.</p>
                </IonContent>
            </IonPage>
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro de Administrador</IonTitle>
                    <IonTitle size="small">Agrega un nuevo Admin</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-text-center'>
                <IonRow>
                    <IonCol style={{ marginTop: "35px", marginBottom: "15px" }}>
                        <IonIcon icon={personAddSharp} color="tertiary" style={{ fontSize: "125px", color: "#0040ff" }} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem
                            color="default"
                        >
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "10px", fontSize: "small", padding: "10px" }}
                                placeholder="Identificación"
                                color="tertiary"
                                value={dni_id}
                                onIonChange={(e: any) => setDni_id(e.detail.value!)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem
                            color="default"
                        >
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "10px", fontSize: "small", padding: "10px" }}
                                placeholder="Nombre Completo"
                                color="tertiary"
                                value={name}
                                onIonChange={(e: any) => setName(e.detail.value!)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem
                            color="default"
                        >
                            <IonInput
                                type="email"
                                required
                                style={{ marginTop: "10px", fontSize: "small", padding: "10px" }}
                                placeholder="Correo Electrónico"
                                color="tertiary"
                                value={email}
                                onIonChange={(e: any) => setEmail(e.detail.value!)}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem
                            color="default"
                        >
                            <IonInput
                                ref={passwordInputRef}
                                type={showPassword ? "text" : "password"}
                                required
                                style={{ marginTop: "10px", fontSize: "small", padding: "10px" }}
                                placeholder="Contraseña"
                                color="tertiary"
                                value={password}
                                onIonChange={(e: any) => setPassword(e.detail.value!)}
                            />
                            <IonIcon
                                icon={showPassword ? eyeOffOutline : eyeOutline}
                                color="tertiary"
                                onClick={toggleShowPassword}
                                style={{ fontSize: "25px", color: "tertiary", marginLeft: "10px", marginTop: "12px", cursor: "pointer" }}
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block"
                            shape="round"
                            color="tertiary"
                            style={{ marginTop: "10px", padding: "10px" }}
                            onClick={handleRegister}
                        >
                            Registrar
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={errorMessage}
                    duration={3000}
                    color="danger"
                />
                <IonToast
                    isOpen={showSuccessToast}
                    onDidDismiss={() => setShowSuccessToast(false)}
                    message="¡Registro exitoso!"
                    duration={3000}
                    color="success"
                />
            </IonContent>
        </IonPage>
    );
}

export default AdminRegister;
