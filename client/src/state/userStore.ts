import create from 'zustand';

interface FavoriteCity {
  city: string;
  country: string;
  key: string;
}

interface UserStoreState {
  isMetric: boolean;
  setIsMetric: (value: boolean) => void;
  favorites: FavoriteCity[];
  setFavorites: (value: FavoriteCity[]) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  isMetric: true,
  favorites: [],
  setIsMetric: (value) => set({ isMetric: value }),
  setFavorites: (value) => set({ favorites: value }),
}));

export default useUserStore;
