import React from 'react';
import { IonIcon } from '@ionic/react';
import { cubeOutline } from 'ionicons/icons'; // Icono por defecto

interface EmptyStateProps {
    icon?: string;
    title: string;
    message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon = cubeOutline, title, message }) => {
    return (
        <div className="empty-state">
            <IonIcon icon={icon} />
            <h5>{title}</h5>
            <p>{message}</p>
        </div>
    );
};

export default EmptyState;