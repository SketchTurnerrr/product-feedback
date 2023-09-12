import { create } from 'zustand';

interface Filter {
  category: string;
  setCategory: (to: string) => void;
}

export const useStore = create<Filter>()((set) => ({
  category: 'all',
  setCategory: (to) => set(() => ({ category: to })),
}));
