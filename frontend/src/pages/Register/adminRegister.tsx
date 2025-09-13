import React, { useState, useRef } from 'react';
import { personAddSharp, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonRow, IonTitle, IonToast, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useAuth } from '../../Auth/AuthContext';
import axios from 'axios';
import AccessDenied from '../../components/AccessDenied'; // Importar componente

const AdminRegister: React.FC = () => {
    // ... (mantiene todos tus hooks: useState, useRef, etc.)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dni_id, setDni_id] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const { isAuthenticated, role } = useAuth();
    
    // ... (mantiene tus funciones toggleShowPassword y handleRegister)
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
                 // Limpiar campos tras éxito
                setName("");
                setEmail("");
                setPassword("");
                setDni_id("");
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


    // CORRECCIÓN LÓGICA: Debería ser !isAuthenticated
    if (!isAuthenticated) {
        return <AccessDenied message="Para acceder a esta página, por favor inicie sesión." />;
    }

    // AHORA USAMOS EL ROL DEL CONTEXTO
    if (role !== 'Administrador') {
        return <AccessDenied message="Esta página es solo para Súper Administradores." />;
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro de Administrador</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className="form-card">
                    <IonCardHeader className="ion-text-center">
                        <IonIcon icon={personAddSharp} color="primary" style={{ fontSize: "80px" }} />
                        <IonCardTitle>Agregar Nuevo Admin</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem className="ion-margin-bottom">
                            <IonInput label="Identificación" labelPlacement="floating" type="text" required value={dni_id} onIonChange={(e: any) => setDni_id(e.detail.value!)} />
                        </IonItem>
                        <IonItem className="ion-margin-bottom">
                            <IonInput label="Nombre Completo" labelPlacement="floating" type="text" required value={name} onIonChange={(e: any) => setName(e.detail.value!)} />
                        </IonItem>
                        <IonItem className="ion-margin-bottom">
                            <IonInput label="Correo Electrónico" labelPlacement="floating" type="email" required value={email} onIonChange={(e: any) => setEmail(e.detail.value!)} />
                        </IonItem>
                        <IonItem className="ion-margin-bottom">
                            <IonInput
                                label="Contraseña"
                                labelPlacement="floating"
                                ref={passwordInputRef}
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onIonChange={(e: any) => setPassword(e.detail.value!)}
                            />
                            <IonIcon slot="end" icon={showPassword ? eyeOffOutline : eyeOutline} onClick={toggleShowPassword} style={{ cursor: "pointer" }} />
                        </IonItem>
                        <IonButton expand="block" shape="round" color="primary" className="ion-margin-top" onClick={handleRegister}>
                            Registrar Administrador
                        </IonButton>
                    </IonCardContent>
                </IonCard>
                {/* ... (Tus componentes IonToast se mantienen igual) ... */}
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