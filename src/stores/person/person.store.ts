import { type StateCreator, create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// import { customSessionStorage } from "../storages/sesion-storage";
import { firebaseStorage } from "../storages/firebase-storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

// const storeApi: StateCreator<PersonState & Actions> = (set) => ({
//   firstName: "",
//   lastName: "",
//   setFirstName: (value) => set(()=>({ firstName: value })),
//   setLastName: (value) => set(()=>({ lastName: value })),
// });

// Ccongifuracion para usar las redux devtools, le pone el nombre al store
const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set, get, store) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value) => set({ firstName: value }, false, "setFirstName"),
  setLastName: (value) => set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  // logguer es un custom middleware
  logger(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        // storage: customSessionStorage, //coment this line to use default storage: localStorage
        storage: firebaseStorage,
      })
    )
  )
);
