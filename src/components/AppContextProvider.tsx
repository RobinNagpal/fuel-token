import { useGetFuelTokenState } from '@/hooks/useGetFuelTokenState';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// import { useGetGameBoard, useGetGameState } from '../hooks';

type AppContextObject = {
  isLoading: boolean;
};

type AppContextType = {
  appContextData: AppContextObject;
  setAppContext: (appContext: AppContextObject) => void;
} | null;

const AppContext = createContext<AppContextType>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

type AppContextProviderProps = {
  children?: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { fuelTokensState, isLoading } = useGetFuelTokenState();
  const [appContext, setAppContext] = useState<AppContextObject>({
    isLoading: false,
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <AppContext.Provider
      value={{
        appContextData: {
          ...appContext,
        },
        setAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
