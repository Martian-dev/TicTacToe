// src/components/Cell.tsx
import React from 'react';
import type { CellValue } from '../store/gameStore';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell }) => {
  const cellClasses = `w-16 h-16 border border-gray-400 flex items-center justify-center text-3xl font-bold cursor-pointer
                       ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-600' : ''}
                       ${isWinningCell ? 'bg-yellow-200' : ''}`; // Highlight winning cells

  return (
    <div className={cellClasses} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
