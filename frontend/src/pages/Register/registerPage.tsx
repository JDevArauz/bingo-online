import React, { useState, useRef } from 'react';
import { personAddOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dni_id, setDni_id] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

    const toggleShowPassword = async () => {
        const input = await passwordInputRef.current?.getInputElement();
        if (input) {
            input.type = showPassword ? "password" : "text";
        }
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = async () => {
        const input = await confirmPasswordInputRef.current?.getInputElement();
        if (input) {
            input.type = showConfirmPassword ? "password" : "text";
        }
        setShowConfirmPassword(!showConfirmPassword);
    };

    const confirmPasswordValidation = (): boolean => {
        return password === confirmPassword;
    };

    const handleRegister = async () => {
        if (!confirmPasswordValidation()) {
            setErrorMessage("Las contraseñas no coinciden");
            setShowToast(true);
            return;
        }
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
                dni_id: dni_id
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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                    <IonTitle size="small">Crea una nueva cuenta</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-text-center ion-padding'>
                <IonRow>
                    <IonCol style={{ marginTop: "35px", marginBottom: "15px" }}>
                        <IonIcon icon={personAddOutline} color="tertiary" style={{ fontSize: "125px", color: "#0040ff" }} />
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
                                style={{ marginTop: "10px", fontSize: "small" }}
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
                                style={{ marginTop: "10px",  fontSize: "small" }}
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
                                style={{ marginTop: "10px",  fontSize: "small" }}
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
                                style={{ marginTop: "10px",  fontSize: "small" }}
                                placeholder="Contraseña"
                                color="tertiary"
                                value={password}
                                onIonChange={(e: any) => setPassword(e.detail.value!)}
                            />
                            <IonIcon
                                icon={showPassword ? eyeOffOutline : eyeOutline}
                                color="tertiary"
                                onClick={toggleShowPassword}
                                style={{ fontSize: "25px", color: "tertiary", marginLeft: "10px", marginTop: "5px", cursor: "pointer" }}
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
                                ref={confirmPasswordInputRef}
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                style={{ marginTop: "10px",  fontSize: "small" }}
                                placeholder="Confirmar Contraseña"
                                color="tertiary"
                                value={confirmPassword}
                                onIonChange={(e: any) => setConfirmPassword(e.detail.value!)}
                            />
                            <IonIcon
                                icon={showConfirmPassword ? eyeOffOutline : eyeOutline}
                                color="tertiary"
                                onClick={toggleShowConfirmPassword}
                                style={{ fontSize: "25px", color: "tertiary", marginLeft: "10px", marginTop: "5px", cursor: "pointer" }}
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
                            Registrarme
                        </IonButton>
                    </IonCol>
                </IonRow>
                <p>
                    Ya tienes una cuenta? <a href="/login" style={{ color: "#6C48C5", textDecoration: "none", fontWeight: "bold", fontSize: "medium", marginLeft: "10px" }}>
                        Inicia Sesión
                    </a>
                </p>
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

export default RegisterPage;
