import { queryClient } from '@/components/Providers';
import {
  AddressInput,
  IdentityInput,
} from '@/contract-types/contracts/FuelTokenAbi';
import { useWallet } from '@fuels/react';
import { ZeroBytes32 } from 'fuels';
import { useMutation } from '@tanstack/react-query';

import { useAppContext } from '@/components/AppContextProvider';
import { CONTRACT_ID } from '@/config';
import { FuelTokenAbi__factory } from '@/contract-types';
import { Address } from 'fuels';

export const useMintTokens = (player1Address: IdentityInput) => {
  const { wallet } = useWallet();
  const appContext = useAppContext();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!wallet) throw new Error(`Cannot increment if wallet is ${wallet}`);

      const contract = FuelTokenAbi__factory.connect(CONTRACT_ID, wallet);
      console.log('contract', contract);
      await contract.functions.mint(player1Address, ZeroBytes32, 1000).call();
      console.log('minted');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      appContext?.setAppContext({
        ...appContext.appContextData,
      });
    },
    onError: async (err) => {
      // TODO: remove once we figure out why a successful call returns an error from the ts sdk
      // // on beta-5
      // await queryClient.invalidateQueries();

      console.error(err);
    },
  });

  return mutation;
};
