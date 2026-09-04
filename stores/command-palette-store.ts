import { create } from "zustand";

interface CommandPaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCommandPaletteStore = create<CommandPaletteState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, searchQuery: "" }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen, searchQuery: "" })),
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
