import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLoading } from '@ionic/react';
import { useSocket } from '../contexts/SocketContext';
import DrawnNumbersDisplay from '../components/DrawnNumbersDisplay'; // REUTILIZAMOS EL COMPONENTE

const AdminBingoPage: React.FC = () => {
  const { socket, isConnected } = useSocket();
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on('gameState', (data: { drawnNumbers: number[], currentNumber: number | null }) => {
        setDrawnNumbers(data.drawnNumbers);
        setCurrentNumber(data.currentNumber);
      });
      socket.on('bingoVerified', (data: { userId: string, message: string }) => {
        alert(`Admin: ¡Bingo verificado para ${data.userId}!`);
      });
      socket.on('gameReset', () => {
        alert('Admin: El juego ha sido reiniciado.');
        setDrawnNumbers([]);
        setCurrentNumber(null);
      });
      return () => {
        socket.off('gameState');
        socket.off('bingoVerified');
        socket.off('gameReset');
      };
    }
  }, [socket]);

  const handleDrawNumber = () => {
    if (socket) {
      socket.emit('adminDrawNumber');
    }
  };

  const handleResetGame = () => {
    if (socket) {
      socket.emit('adminResetGame');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Panel de Administrador de Bingo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={!isConnected} message={'Conectando al servidor...'} />

        {isConnected && (
            <>
                <DrawnNumbersDisplay drawnNumbers={drawnNumbers} currentNumber={currentNumber} />

                <div className="ion-padding" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <IonButton expand="block" size="large" onClick={handleDrawNumber} disabled={drawnNumbers.length >= 75}>
                        Sacar Siguiente Número
                    </IonButton>
                    <IonButton expand="block" size="large" onClick={handleResetGame} color="danger">
                        Reiniciar Juego
                    </IonButton>
                </div>
            </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AdminBingoPage;