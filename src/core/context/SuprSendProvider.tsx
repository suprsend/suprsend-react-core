import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import SuprSend from '@suprsend/web-sdk';
import { SuprSendContextProps, SuprSendProviderProps } from '../../interface';
import { authenticateUser } from '../hooks';

export const SuprSendContext = createContext<SuprSendContextProps>({
  suprsendClient: undefined,
  authenticatedUser: undefined,
  setAuthenticatedUser: undefined,
});

function SuprSendProvider({
  publicApiKey,
  distinctId,
  userToken,
  host,
  vapidKey,
  swFileName,
  refreshUserToken,
  children,
}: SuprSendProviderProps) {
  const suprsendClientRef = useRef<SuprSend>();
  const [authenticatedUser, setAuthenticatedUser] = useState<unknown>(null);

  suprsendClientRef.current = useMemo(() => {
    return new SuprSend(publicApiKey, {
      host,
      vapidKey,
      swFileName,
    });
  }, []);

  const handleUserAuthentication = async () => {
    const authenticationStatus = await authenticateUser({
      distinctId,
      userToken,
      refreshUserToken,
      suprsendClient: suprsendClientRef.current as SuprSend,
    });
    setAuthenticatedUser(authenticationStatus ? distinctId : null);
  };

  useEffect(() => {
    handleUserAuthentication();
  }, [distinctId, userToken]);

  return (
    <SuprSendContext.Provider
      value={{
        suprsendClient: suprsendClientRef.current,
        authenticatedUser,
        setAuthenticatedUser,
      }}
    >
      {children}
    </SuprSendContext.Provider>
  );
}

export default SuprSendProvider;
