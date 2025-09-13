import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import io from 'socket.io-client';
import { useSocket } from '../contexts/SocketContext';
const socket = io('http://localhost:3001');



const GamesPage: React.FC = () => {
    const [numerosLlamados, setNumerosLlamados] = useState<number[]>([]);
    const [carton, setCarton] = useState<(number | string)[][]>([
      [5, 18, 42, 60, 75],
      [10, 20, 35, 55, 65],
      [3, 24, 'X', 52, 68],   
      [1, 23, 44, 53, 70],
      [7, 19, 39, 57, 72],
    ]);
    const [numerosSeleccionados, setNumerosSeleccionados] = useState<number[]>([]);
    const [jugadores, setJugadores] = useState<string[]>([]);
  
    useEffect(() => {
      // Unirse al juego
      const playerName = prompt("Introduce tu nombre:") || "Jugador";
      socket.emit('joinGame', playerName);
  
      // Escuchar números llamados
      socket.on('numberCalled', (number: number) => {
        setNumerosLlamados((prev) => [...prev, number]);
      });
  
      // Escuchar la lista de jugadores
      socket.on('playerList', (players: string[]) => {
        setJugadores(players);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const selectNumber = (numero: number | string) => {
        // Asegúrate de que el número seleccionado sea un número
        if (typeof numero === 'number' && !numerosSeleccionados.includes(numero)) {
          setNumerosSeleccionados((prev) => [...prev, numero]);
          console.log('Número seleccionado:', numero);
        } else if (typeof numero === 'number') {
          console.log('Número ya seleccionado:', numero);
          // Remover el número de la lista
          setNumerosSeleccionados((prev) => prev.filter((num) => num !== numero));
        } else {
          console.log('Espacio libre seleccionado');
        }
      };
    const callNumber = (number: number) => {
      socket.emit('callNumber', number);
    };
  
  
    // Función para obtener la clase de color basada en el estado del número
    const getColorClass = (numero: number | string) => {
      if (typeof numero === 'number' && !numerosSeleccionados.includes(numero)) {
        return 'bg-purple-800 text-white'; // Color para números seleccionados
      }
      if (typeof numero === 'number' && !numerosLlamados.includes(numero)) {
        return 'bg-green-600 text-white'; // Color para números llamados
      }
      return 'bg-purple-200 hover:bg-purple-800 hover:text-white'; // Color por defecto
    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Juego de Bingo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark">
      {/* Números llamados */}
      <div className="rounded-lg shadow-md p-2 bg-white border">
        <h2 className="text-xl font-semibold mb-1 text-purple-800 text-center">Números llamados</h2>
        <div className="grid grid-cols-8 text-black font-semibold">
          {numerosLlamados.map((numero, index) => (
            <strong
              key={index}
              className="py-3 px-2 font-bold bg-purple-800 text-white text-center p-2 rounded-lg border border-black"
            >
              {numero}
            </strong>
          ))}
        </div>
      </div>

      {/* Cartón de Bingo */}
      <div className="flex justify-center items-center py-8 ">
        <div className="pr-12 pb-12 rounded-lg bg-yellow-500 w-80 shadow-lg">
          <div className="grid grid-cols-6 text-black bg-transparent font-semibold">
            {/* Encabezados B-I-N-G-O */}
            <div className="font-bold text-center p-3 rounded-lg"></div>
            {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
              <strong key={index} className="text-purple-700 text-center p-3 rounded-lg">
                {letter}
              </strong>
            ))}

            {/* Celdas del cartón de Bingo */}
            {carton.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <strong className="text-red-700 text-center py-3 rounded-lg">{rowIndex + 1}</strong>
                {row.map((numero, cellIndex) => (
                  <a
                    key={cellIndex}
                    onClick={() => selectNumber(numero)} // Manejar la selección
                    className={`border rounded-lg border-black text-center py-3 ${getColorClass(numero)}`}
                  >
                    {numero === 0 ? 'Libre' : numero} {/* Mostrar 'Libre' si el número es 0 */}
                  </a>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de Cantar Bingo */}
      <div className="flex justify-center">
        <a
          href="#"
          className="text-white font-bold shadow-lg bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-600"
        >
          CANTAR BINGO!!!
        </a>
      </div>
    </IonContent>
    </IonPage>
  );
};

export default GamesPage;
