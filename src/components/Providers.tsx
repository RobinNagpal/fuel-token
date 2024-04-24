'use client';

import {FuelWalletConnector} from '@fuel-wallet/sdk';
import {FuelProvider} from '@fuels/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {ReactNode} from 'react';

import {AppContextProvider} from './AppContextProvider';

type ProvidersProps = {
  children?: ReactNode;
};

// TODO add toast for errors?
export const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  let fuelWalletConnector: any = new FuelWalletConnector();
  return (
    <FuelProvider fuelConfig={{ connectors: [fuelWalletConnector] }}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>{children}</AppContextProvider>
      </QueryClientProvider>
    </FuelProvider>
  );
};
