import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { users } from '../data/users'; 

export interface StoreUser {
  username: string;
  email: string;
  avatarColor: string;
}

interface UserStore {
  currentUser: StoreUser;
  accounts: StoreUser[];
  switchAccount: (email: string) => void;
  addAccount: (username: string, email: string) => void;
  removeAccount: (email: string) => void;
}

const COLORS = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];

const mapUserToStore = (u: { username: string; email: string }) => ({
  username: u.username,
  email: u.email,
  avatarColor: COLORS[u.username.length % COLORS.length]
});

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: mapUserToStore(users[0]),
      
      accounts: users.map(mapUserToStore),

      switchAccount: (email) => set((state) => {
        const user = state.accounts.find(u => u.email === email);
        return user ? { currentUser: user } : state;
      }),

      addAccount: (username, email) => set((state) => {
        const newUser: StoreUser = {
          username,
          email,
          avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
        return { 
          accounts: [...state.accounts, newUser],
          currentUser: newUser 
        };
      }),

      removeAccount: (email) => set((state) => {
        const newAccounts = state.accounts.filter(a => a.email !== email);
        const newCurrent = state.currentUser.email === email ? newAccounts[0] : state.currentUser;
        return { accounts: newAccounts, currentUser: newCurrent };
      })
    }),
    { name: 'user-storage-v2' } 
  )
);