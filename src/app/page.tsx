'use client';

import { useAppContext } from '@/components/AppContextProvider';
import { Button } from '@/components/Button';
import { ConnectButton } from '@/components/ConnectButton';
import { WalletDisplay } from '@/components/WalletDisplay';
import { CONTRACT_ID, PROVIDER_URL } from '@/config';
import { FuelTokenAbi__factory } from '@/contract-types';
import { useActiveWallet } from '@/hooks/useActiveWallet';
import { useGetFuelTokenState } from '@/hooks/useGetFuelTokenState';
import { useMintTokens } from '@/hooks/useMintTokens';
import {
  useAccounts,
  useIsConnected,
  useProvider,
  useWallet,
} from '@fuels/react';
import { BaseAssetId, encrypt, decrypt, bn, ZeroBytes32 } from 'fuels';
import { useEffect } from 'react';

export default function Home() {
  const { wallet, walletBalance } = useActiveWallet();
  const appContext = useAppContext();
  const { provider, isLoading, isError } = useProvider();
  const { isConnected, isLoading: isConnectedLoading } = useIsConnected();
  const { accounts } = useAccounts();
  const { fuelTokensState } = useGetFuelTokenState();
  const addressInput = { value: wallet?.address.toB256() };
  const mutation = useMintTokens({
    Address: {
      bits: addressInput.value!,
    },
  });

  const { wallet: browserWallet } = useWallet();
  const mintTokens = async () => {
    if (!wallet) throw new Error(`Cannot increment if wallet is ${wallet}`);
    const contract = FuelTokenAbi__factory.connect(CONTRACT_ID, wallet);
    const addressInput = { value: wallet?.address.toB256() };
    // await contract.functions.set_decimals(ZeroBytes32, 10).call();
    await contract.functions
      .mint(
        {
          Address: {
            bits: addressInput.value!,
          },
        },
        ZeroBytes32,
        1000
      )
      .call();
  };

  const getTokenSupply = async () => {
    if (!browserWallet?.getBalance()) return;
    const contract = FuelTokenAbi__factory.connect(CONTRACT_ID, browserWallet);

    const result = await contract.functions.asset_id(ZeroBytes32).get();
    console.log(`result`, result);
    console.log(`result value`, result.value);
    console.log(`result value`, result.value);

    const result2 = await contract.functions.total_supply(result.value).get();
    console.log(`result2`, result2);
    console.log(`result2 value`, result2.value?.toNumber());
    console.log(`result2 value`, result2.value?.abs());
  };
  const showProviderError =
    (!isLoading && provider && provider.url !== PROVIDER_URL) || isError;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mt-24 float-right">
        <ConnectButton />
      </div>
      <div className="mt-24">
        <WalletDisplay />
      </div>
      <div className="mt-24">
        {isConnected === false && !isConnectedLoading ? (
          <div>{`Your wallet is not connected to the app.  Please press the connect button and connect your wallet.`}</div>
        ) : showProviderError ? (
          <div>{`Your wallet is not connected to the correct network.  Please connect to ${PROVIDER_URL}`}</div>
        ) : null}

        <div>{fuelTokensState?.toString()}</div>
      </div>
      <div className="mt-24">
        <Button onClick={() => getTokenSupply()}>Get Token Supply</Button>
      </div>
      <div className="mt-24">
        <Button onClick={() => mintTokens()}>Mint Tokens</Button>
      </div>
    </main>
  );
}
