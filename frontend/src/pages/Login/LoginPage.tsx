import { personCircleOutline } from "ionicons/icons";
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonAlert, IonText } from "@ionic/react";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState("");
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const history = useHistory();

    const handlelogin = async () => {
        console.log(import.meta.env.VITE_HOST_URL);
        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/session/login`, {
                user: user,
                pass: pass
            });
            if (res.status === 200) {
                history.push("/tab1");
            } else {
                setErrorMessage("Login failed: Empty response or no data received from the server.");
                setAlertTitle("Error");
                setShowAlert(true);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An unknown error occurred. Please try again.";
            setErrorMessage(errorMessage);
            setAlertTitle("Error");
            setShowAlert(true);
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
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => {
                            setShowAlert(false);
                            setErrorMessage("");
                        }}
                        header={alertTitle}
                        message={errorMessage}
                        buttons={['Cerrar']}
                    />
                </IonRow>

                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "10px", padding: "10px", fontSize: "small" }}
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
                        <IonItem>
                            <IonInput
                                type="password"
                                required
                                style={{ marginTop: "10px", padding: "10px", fontSize: "small" }}
                                value={pass}
                                onIonChange={(e: any) => setPass(e.detail.value!)}
                                placeholder="Contraseña"
                                color="tertiary"
                            ></IonInput>
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
                        >Iniciar Sesion</IonButton>
                    </IonCol>
                </IonRow>
                <p style={{ fontSize: "medium" }}>
                    No tienes una cuenta ? <a href="/register"
                        style={{ color: "#0040ff", textDecoration: "none", fontWeight: "bold", fontSize: "medium", marginLeft: "10px" }}
                    >Registrate</a>
                </p>
            </IonContent>
        </IonPage>
    );
}

export default LoginPage;
