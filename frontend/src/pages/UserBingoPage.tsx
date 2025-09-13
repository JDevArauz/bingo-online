import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLoading } from '@ionic/react';
import { useSocket } from '../contexts/SocketContext';
import BingoCard from '../components/BingoCard'; // USAMOS EL NUEVO COMPONENTE
import DrawnNumbersDisplay from '../components/DrawnNumbersDisplay'; // USAMOS EL NUEVO COMPONENTE

type BingoNumber = { value: number; marked: boolean };
type BingoCardType = BingoNumber[][];

const UserBingoPage: React.FC = () => {
  const { socket, isConnected } = useSocket();
  const [myCard, setMyCard] = useState<BingoCardType>([]);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  // ... (Toda tu lógica de useEffect y las funciones generateBingoCard, handleMarkNumber, handleCallBingo se mantienen exactamente igual)
    // Función para generar un cartón de bingo (simplificada)
  const generateBingoCard = (): BingoCardType => {
    const card: BingoCardType = [];
    const usedNumbers = new Set<number>();
    for (let i = 0; i < 5; i++) {
      const row: BingoNumber[] = [];
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) { 
          row.push({ value: 0, marked: true });
          continue;
        }
        let num;
        do {
          num = Math.floor(Math.random() * 15) + 1 + j * 15;
        } while (usedNumbers.has(num));
        usedNumbers.add(num);
        row.push({ value: num, marked: false });
      }
      card.push(row);
    }
    return card;
  };

  useEffect(() => {
    setMyCard(generateBingoCard());
    if (socket) {
      socket.on('gameState', (data: { drawnNumbers: number[], currentNumber: number | null }) => {
        setDrawnNumbers(data.drawnNumbers);
        setCurrentNumber(data.currentNumber);
      });
      socket.on('newNumberDrawn', (number: number) => {
        setDrawnNumbers(prev => [...prev, number]);
        setCurrentNumber(number);
      });
      socket.on('bingoVerified', (data: { userId: string, message: string }) => {
        alert(`¡Bingo verificado para ${data.userId}! ${data.message}`);
      });
      socket.on('bingoRejected', (message: string) => {
        alert(`Bingo rechazado: ${message}`);
      });
      socket.on('gameReset', () => {
        alert('El juego ha sido reiniciado por el administrador.');
        setDrawnNumbers([]);
        setCurrentNumber(null);
        setMyCard(generateBingoCard());
      });
      return () => {
        socket.off('gameState');
        socket.off('newNumberDrawn');
        socket.off('bingoVerified');
        socket.off('bingoRejected');
        socket.off('gameReset');
      };
    }
  }, [socket]);

  const handleMarkNumber = (rowIndex: number, colIndex: number) => {
    const newCard = myCard.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex && drawnNumbers.includes(cell.value)) {
          return { ...cell, marked: !cell.marked };
        }
        return cell;
      })
    );
    setMyCard(newCard);
  };

  const handleCallBingo = () => {
    if (socket) {
      console.log('User: Calling Bingo!');
      socket.emit('userCallsBingo', myCard);
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Cartón de Bingo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={!isConnected} message={'Conectando al servidor...'} />
        
        {isConnected && (
            <>
                {/* Componentes visuales que reemplazan la UI antigua */}
                <DrawnNumbersDisplay drawnNumbers={drawnNumbers} currentNumber={currentNumber} />
                
                <BingoCard card={myCard} drawnNumbers={drawnNumbers} onMarkNumber={handleMarkNumber} />

                <div className="ion-padding">
                    <IonButton expand="block" shape="round" size="large" onClick={handleCallBingo} disabled={!myCard.length}>
                        ¡Cantar Bingo!
                    </IonButton>
                </div>
            </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default UserBingoPage;