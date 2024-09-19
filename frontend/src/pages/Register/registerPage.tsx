import React from 'react';
import { personAddOutline } from 'ionicons/icons';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [dni_id, setDni_id] = React.useState("");

    const confirmPasswordValidation = () => {
        if (password !== confirmPassword) {
            return false;
        }
    }

    const handleRegister = async () => {
        try {
            if (confirmPasswordValidation()) {
                console.log("Las contraseñas no coinciden");
                return;
            };
            const res = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/session/register`, {
                name: name,
                email: email,
                password: password,
                dni_id: dni_id
            });
            if (res.status === 200) {
                console.log(res.data);
            } else {
                console.log("Error");
            }
        } catch (error: any) {
            console.log(error.response?.data?.message || "An unknown error occurred. Please try again.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                    <IonTitle size="small">Crea una nueva cuenta</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-text-center'>
                <IonRow>
                    <IonCol style={{ marginTop: "35px" }}>
                        <IonIcon icon={personAddOutline}
                            color="tertiary"
                            style={{ fontSize: "125px", color: "#0040ff" }} />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "45px" }}
                                placeholder="Identificación"
                                color="tertiary"
                                shape='round'
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "20px", }}
                                placeholder="Nombre Completo"
                                color="tertiary"
                                shape='round'
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                type="text"
                                required
                                style={{ marginTop: "25px", }}
                                placeholder="Correo Electrónico"
                                color="tertiary"
                                shape='round'
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
                                style={{ marginTop: "25px", }}
                                placeholder="Contraseña"
                                color="tertiary"
                                shape='round'
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
                                style={{ marginTop: "25px", }}
                                placeholder="Confirmar Contraseña"
                                color="tertiary"
                                shape='round'
                            ></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block"
                            shape="round"
                            color="tertiary"
                            style={{ marginTop: "25px", padding: "10px" }}
                        >Registrarme</IonButton>
                    </IonCol>
                </IonRow>
                <p>
                    Ya tienes una cuenta ? <a href="/login"
                        style={{ color: "#0040ff", textDecoration: "none", fontWeight: "bold", fontSize: "medium", marginLeft: "10px" }}
                    >Inicia Sesión</a>
                </p>
            </IonContent>

        </IonPage>
    );
}

export default RegisterPage;