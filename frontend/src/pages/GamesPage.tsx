import React, { useState } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";


const GamesPage: React.FC = () => {
    const numerosLlamados = [12, 34, 56, 78, 90, 11, 22, 33]; // Ejemplo de números llamados
    const [numerosSeleccionados, setNumerosSeleccionados] = useState<number[]>([]);
    
    const carton = [
      [5, 18, 42, 60, 75],
      [10, 20, 35, 55, 65],
      [3, 24, 0, 52, 68],  // El 0 es el espacio "Libre"
      [1, 23, 44, 53, 70],
      [7, 19, 39, 57, 72],
    ];
  
    // Función para manejar la selección de números
    const selectNumber = (numero: number) => {
      if (!numerosSeleccionados.includes(numero)) {
        setNumerosSeleccionados([...numerosSeleccionados, numero]);
        console.log('Número seleccionado:', numero);
      } else {
        console.log('Número ya seleccionado:', numero);
        // Remover el número de la lista y volver al color normal
        setNumerosSeleccionados(numerosSeleccionados.filter((num) => num !== numero));
      }
    };
  
    // Función para obtener la clase de color basada en el estado del número
    const getColorClass = (numero: number) => {
      if (numerosSeleccionados.includes(numero)) {
        return 'bg-purple-800 text-white'; // Color para números seleccionados
      }
      if (numerosLlamados.includes(numero)) {
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
