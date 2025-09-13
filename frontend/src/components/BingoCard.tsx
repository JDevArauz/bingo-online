import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

type BingoNumber = { value: number; marked: boolean };
type BingoCardType = BingoNumber[][];

interface BingoCardProps {
    card: BingoCardType;
    drawnNumbers: number[];
    onMarkNumber: (rowIndex: number, colIndex: number) => void;
}

const BingoCard: React.FC<BingoCardProps> = ({ card, drawnNumbers, onMarkNumber }) => {
    if (!card || card.length === 0) {
        return null; // No renderizar nada si no hay cartón
    }

    return (
        <div className="bingo-card-grid">
            <IonGrid className="ion-no-padding">
                <IonRow className="ion-justify-content-center">
                    {['B', 'I', 'N', 'G', 'O'].map(letter => (
                        <IonCol key={letter} className="bingo-header-cell">{letter}</IonCol>
                    ))}
                </IonRow>
                {card.map((row, rIndex) => (
                    <IonRow key={rIndex} className="ion-justify-content-center">
                        {row.map((cell, cIndex) => {
                            const isDrawn = drawnNumbers.includes(cell.value);
                            const canMark = isDrawn && cell.value !== 0;
                            const isFreeSpace = cell.value === 0;

                            // Clases dinámicas para el estilo
                            const cellClasses = `bingo-cell 
                                ${isFreeSpace ? 'free-space' : ''}
                                ${canMark ? 'can-mark' : ''}
                                ${cell.marked ? 'marked' : ''}
                            `;

                            return (
                                <IonCol
                                    key={cIndex}
                                    className={cellClasses}
                                    onClick={() => canMark && onMarkNumber(rIndex, cIndex)}
                                >
                                    {isFreeSpace ? 'FREE' : cell.value}
                                </IonCol>
                            );
                        })}
                    </IonRow>
                ))}
            </IonGrid>
        </div>
    );
};

export default BingoCard;