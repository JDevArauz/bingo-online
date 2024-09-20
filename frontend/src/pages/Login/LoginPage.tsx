import { personCircleOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonPage, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonToast } from "@ionic/react";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    const toggleShowPassword = async () => {
        setShowPassword(!showPassword);
        const input = await passwordInputRef.current?.getInputElement();
        if (input) {
            input.type = showPassword ? "password" : "text";
        }
    };

    const handlelogin = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/session/login`, {
                user: user,
                pass: pass
            });
            if (res.status === 200) {
                history.push("/tab1");
            } else {
                setErrorMessage("Error al iniciar sesión. Por favor, intente de nuevo.");
                setShowToast(true);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ha ocurrido un error desconocido. Por favor, intente de nuevo.";
            setErrorMessage(errorMessage);
            setShowToast(true);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bienvenidos</IonTitle>
                    <IonTitle size="small">Inicio de sesión</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding ion-text-center" style={{ overflowY: "hidden" }}>
                <IonRow>
                    <IonCol style={{ marginTop: "35px" }}>
                        <IonIcon icon={personCircleOutline}
                            color="tertiary"
                            style={{ fontSize: "185px", color: "#0040ff" }} />
                    </IonCol>
                </IonRow>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={errorMessage}
                    duration={3000}
                    position="bottom"
                    color="danger"
                    buttons={[
                        {
                            text: 'Cerrar',
                            role: 'cancel',
                            handler: () => {
                                setShowToast(false);
                            }
                        }
                    ]}
                />
                <IonRow>
                    <IonCol>
                        <IonItem
                            color='default'
                        >
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "10px", fontSize: "small" }}
                                value={user}
                                onIonChange={(e: any) => setUser(e.detail.value!)}
                                placeholder="Nombre de usuario o Identificación"
                                color="tertiary"
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem
                            color='default'
                        >
                            <IonInput
                                ref={passwordInputRef}
                                type="password"
                                required
                                style={{ marginTop: "10px", fontSize: "small" }}
                                value={pass}
                                onIonChange={(e: any) => setPass(e.detail.value!)}
                                placeholder="Contraseña"
                                color="tertiary"
                            ></IonInput>
                            <IonIcon
                                icon={showPassword ? eyeOffOutline : eyeOutline}
                                color="tertiary"
                                onClick={toggleShowPassword}
                                style={{ fontSize: "25px", color: "tertiary", marginLeft: "10px", marginTop: "5px" }}
                            ></IonIcon>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block"
                            shape="round"
                            color="tertiary"
                            onClick={handlelogin}
                            style={{ marginTop: "25px", padding: "10px" }}
                        >Iniciar Sesión</IonButton>
                    </IonCol>
                </IonRow>
                <p style={{ fontSize: "medium" }}>
                    ¿No tienes una cuenta? <a href="/register"
                        style={{ color: "#6C48C5", textDecoration: "none", fontWeight: "bold", fontSize: "medium", marginLeft: "10px" }}
                    >Regístrate</a>
                </p>
            </IonContent>
        </IonPage>
    );
}

export default LoginPage;
