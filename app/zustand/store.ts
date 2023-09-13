import { create } from 'zustand';

interface Order {
  order: string;
  setOrder: (by: string) => void;
}

export const useStore = create<Order>()((set) => ({
  order: 'most_upvotes',
  setOrder: (by) => set(() => ({ order: by })),
}));
