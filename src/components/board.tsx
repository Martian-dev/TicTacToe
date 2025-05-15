// src/components/Board.tsx
import React from 'react';
import Cell from './cell';
import { useGameStore } from '../store/gameStore';

const Board: React.FC = () => {
  const board = useGameStore((state) => state.board);
  const makeMove = useGameStore((state) => state.makeMove);
  const winningLine = useGameStore((state) => state.winningLine);

  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => makeMove(index)}
          isWinningCell={winningLine !== null && winningLine.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
