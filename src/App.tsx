// src/App.tsx
import Board from './components/board';
import GameStatus from './components/gameStatus';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <Board />
      <GameStatus />
    </div>
  );
}

export default App;
