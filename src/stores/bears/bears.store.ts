import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  totalBears: () => number;

  increaseBlackBear: (by: number) => void;
  increasePolarBear: (by: number) => void;
  increasePandaBear: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  crearBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get, store) => ({
      blackBears: 10,
      polarBears: 20,
      pandaBears: 30,

      bears: [],

      totalBears: () => {
        return get().blackBears + get().polarBears + get().pandaBears;
      },

      increaseBlackBear: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),

      increasePolarBear: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),

      increasePandaBear: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),

      doNothing: () => set((state) => ({ bears: [...state.bears] })),

      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),

      crearBears: () => set({ bears: [] }),
    }),
    { name: "bear-store" }
  )
);
