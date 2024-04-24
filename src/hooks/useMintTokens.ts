import {queryClient} from "@/components/Providers";
import {AddressInput} from "@/contract-types/contracts/FuelTokenAbi";
import {useWallet} from '@fuels/react';
import {useMutation} from '@tanstack/react-query';

import { useAppContext} from '@/components/AppContextProvider';
import {CONTRACT_ID} from '@/config';
import {FuelTokenAbi__factory} from '@/contract-types';

export const useMintTokens = (player1Address: AddressInput, player2Address: string) => {
  const {wallet} = useWallet();
  const appContext = useAppContext();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!wallet) throw new Error(`Cannot increment if wallet is ${wallet}`);

      const contract = FuelTokenAbi__factory.connect(
        CONTRACT_ID,
        wallet
      );
      await contract.functions
        .mint(
          {Address: player1Address},
          player2Address,
          1000
        )
        .call();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      appContext?.setAppContext({
        ...appContext.appContextData,
      });
    },
    onError: async (err) => {
      // TODO: remove once we figure out why a successful call returns an error from the ts sdk
      // on beta-5
      await queryClient.invalidateQueries();
      // eslint-disable-next-line no-console
      console.error(err);
    },
  });

  return mutation;
};
