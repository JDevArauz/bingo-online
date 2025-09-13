import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface DrawnNumbersDisplayProps {
    drawnNumbers: number[];
    currentNumber: number | null;
}

const DrawnNumbersDisplay: React.FC<DrawnNumbersDisplayProps> = ({ drawnNumbers, currentNumber }) => {
    const previousNumbers = drawnNumbers.filter(n => n !== currentNumber);

    return (
        <div className="drawn-numbers-container">
            <h3 className="ion-no-margin">Último Número</h3>
            <div className="current-number">
                {currentNumber ?? '-'}
            </div>

            <h5>Números Anteriores ({previousNumbers.length})</h5>
            <div className="previous-numbers-grid">
                {previousNumbers.slice().reverse().map((num, index) => (
                    <div key={index} className="previous-number">{num}</div>
                ))}
            </div>
        </div>
    );
};

export default DrawnNumbersDisplay;