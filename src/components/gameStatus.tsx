// src/components/GameStatus.tsx
import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameStatus: React.FC = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const winner = useGameStore((state) => state.winner);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const resetGame = useGameStore((state) => state.resetGame);

  let statusText = '';
  if (winner === 'Draw') {
    statusText = "It's a Draw!";
  } else if (winner) {
    statusText = `Winner: ${winner}`;
  } else {
    statusText = `Current Player: ${currentPlayer}`;
  }

  return (
    <div className="mt-4 text-xl font-semibold">
      <p>{statusText}</p>
      {isGameOver && (
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameStatus;
