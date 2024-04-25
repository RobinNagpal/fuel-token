import { useAppContext } from '@/components/AppContextProvider';
import { Button } from '@/components/Button';
import { useIsConnected, useConnect, useDisconnect } from '@fuels/react';

export const ConnectButton = () => {
  const { isConnected } = useIsConnected();
  const { connect, isLoading: isConnectLoading } = useConnect();
  const { disconnect, isLoading: isDisconnectLoading } = useDisconnect();
  const appContext = useAppContext();

  function getButtonText() {
    if (isConnectLoading) {
      return 'Connecting...';
    }
    if (isDisconnectLoading) {
      return 'Disconnecting...';
    }
    if (isConnected) {
      return 'Disconnect';
    }
    return 'Connect';
  }

  return (
    <Button
      onClick={() => {
        if (isConnected) {
          disconnect();
          appContext?.setAppContext({
            ...appContext.appContextData,
          });
        } else {
          connect();
        }
      }}
    >
      {getButtonText()}
    </Button>
  );
};
