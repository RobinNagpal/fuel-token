'use client';

import { useAppContext } from '@/components/AppContextProvider';
import { Button } from '@/components/Button';
import { ConnectButton } from '@/components/ConnectButton';
import { WalletDisplay } from '@/components/WalletDisplay';
import { PROVIDER_URL } from '@/config';
import { useActiveWallet } from '@/hooks/useActiveWallet';
import { useGetFuelTokenState } from '@/hooks/useGetFuelTokenState';
import { useMintTokens } from '@/hooks/useMintTokens';
import { useAccounts, useIsConnected, useProvider } from '@fuels/react';
import { BaseAssetId, encrypt, decrypt, bn } from 'fuels';

export default function Home() {
  const { wallet, walletBalance } = useActiveWallet();
  const appContext = useAppContext();
  const { provider, isLoading, isError } = useProvider();
  const { isConnected, isLoading: isConnectedLoading } = useIsConnected();
  const { accounts } = useAccounts();
  const { fuelTokensState } = useGetFuelTokenState();
  const mutation = useMintTokens({ bits: wallet?.address?.toB256() as string });

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

        <div>{fuelTokensState?.toString() || 'Nothing'}</div>
      </div>
      <div className="mt-24">
        <Button onClick={() => mutation.mutate()}>Mint Tokens</Button>
      </div>
    </main>
  );
}
