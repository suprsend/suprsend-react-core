import { createContext, useState, useEffect, useRef, useMemo } from 'react';
import { SuprSend } from '@suprsend/web-sdk';
import {
  IAuthenticateUserOptions,
  SuprSendContextProps,
  SuprSendProviderProps,
} from '../../interface';
import {
  authenticateUser,
  handleUserAuthentication,
} from '../hooks/useAuthenticateUser';

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
  userAuthenticationHandler,
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

  const handleInternalUserAuthentication = async () => {
    const suprsendClient = suprsendClientRef.current as SuprSend;
    const existingUser = suprsendClient.distinctId;

    const response = await authenticateUser({
      distinctId,
      userToken,
      refreshUserToken,
      suprsendClient: suprsendClient,
    });

    setAuthenticatedUser(suprsendClient.isIdentified() ? distinctId : null);
    if (distinctId || (existingUser && !distinctId)) {
      userAuthenticationHandler?.({
        response,
        authenticateUser: (data: IAuthenticateUserOptions) =>
          handleUserAuthentication({
            ...data,
            suprsendClient,
            setAuthenticatedUser,
          }),
      });
    }
  };

  useEffect(() => {
    handleInternalUserAuthentication();

    return () => {
      const suprsendClient = suprsendClientRef.current;
      if (suprsendClient?.isIdentified()) {
        suprsendClient?.reset();
      }
    };
  }, [distinctId]);

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
