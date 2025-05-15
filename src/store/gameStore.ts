// src/store/gameStore.ts
import { create } from 'zustand';

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'Draw' | null;
  isGameOver: boolean;
  winningLine: number[] | null;
  makeMove: (index: number) => void;
  resetGame: () => void;
  // For future multiplayer
  setBoard: (board: Board) => void;
  setCurrentPlayer: (player: Player) => void;
  setWinner: (winner: Player | 'Draw' | null) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  setWinningLine: (line: number[] | null) => void;
}

const initialBoard: Board = Array(9).fill(null);

const checkWinner = (board: Board): Player | 'Draw' | null => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'Draw';
  }

  return null;
};

const getWinningLine = (board: Board): number[] | null => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }

  return null;
};

export const useGameStore = create<GameState>((set, get) => ({
  board: initialBoard,
  currentPlayer: 'X',
  winner: null,
  isGameOver: false,
  winningLine: null,

  makeMove: (index) => {
    const state = get();
    if (state.board[index] !== null || state.isGameOver) {
      return;
    }

    const newBoard = [...state.board];
    newBoard[index] = state.currentPlayer;

    const winner = checkWinner(newBoard);
    const isGameOver = winner !== null;
    const winningLine = isGameOver && winner !== 'Draw' ? getWinningLine(newBoard) : null;

    set({
      board: newBoard,
      currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      isGameOver,
      winningLine,
    });
  },

  resetGame: () => {
    set({
      board: initialBoard,
      currentPlayer: 'X',
      winner: null,
      isGameOver: false,
      winningLine: null,
    });
  },

  // Methods for future multiplayer (will be called when receiving updates from Supabase)
  setBoard: (board) => set({ board }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setWinner: (winner) => set({ winner }),
  setIsGameOver: (isGameOver) => set({ isGameOver }),
  setWinningLine: (line) => set({ winningLine: line }),
}));
