import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [command, setCommand] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleGenerateCommand = () => {
    // Логика генерации команды
    setCommand(`Generated command based on: ${input}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6 sm:py-12">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-4">Генератор команд для WireGuard</h1>
        <p className="text-center text-gray-600 mb-6">Введите значения в формате `Jc = 43`, `Jmin = 50` и т.д., по одному на строку.</p>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          rows="6"
          value={input}
          onChange={handleInputChange}
          placeholder="Jc = 43&#10;Jmin = 50&#10;Jmax = 70&#10;S1 = 110&#10;S2 = 120&#10;H1 = 1593635057&#10;H2 = 430880481&#10;H3 = 1214405368&#10;H4 = 1739253821"
        />
        <button
          onClick={handleGenerateCommand}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Сгенерировать команду
        </button>
        {command && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">Сгенерированная команда:</h2>
            <pre className="mt-2 text-gray-800">{command}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
