import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  connectionType: NetInfoStateType;
}

/**
 * Hook to monitor network connectivity status
 * @returns Current network status including connection state and type
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    connectionType: NetInfoStateType.unknown,
  });

  useEffect(() => {
    // Get initial state
    NetInfo.fetch().then((state: NetInfoState) => {
      setStatus({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
      });
    });

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus({
        isConnected: state.isConnected ?? true,
        isInternetReachable: state.isInternetReachable,
        connectionType: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  return status;
}

/**
 * Check if device is on a cellular connection
 */
export function useIsCellular(): boolean {
  const { connectionType } = useNetworkStatus();
  return connectionType === NetInfoStateType.cellular;
}

/**
 * Check if device is on WiFi
 */
export function useIsWifi(): boolean {
  const { connectionType } = useNetworkStatus();
  return connectionType === NetInfoStateType.wifi;
}
