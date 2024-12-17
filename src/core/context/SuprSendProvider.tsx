import { createContext, useState, useEffect, useRef } from 'react';
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
  const createSSClient = () => {
    return new SuprSend(publicApiKey, {
      host,
      vapidKey,
      swFileName,
    });
  };

  const suprsendClientRef = useRef<SuprSend>(createSSClient());
  const [authenticatedUser, setAuthenticatedUser] = useState<unknown>(null);

  const handleInternalUserAuthentication = async () => {
    const suprsendClient = suprsendClientRef.current;
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
    setTimeout(() => {
      suprsendClientRef.current = createSSClient();
      handleInternalUserAuthentication();
    }, 0);

    return () => {
      const suprsendClient = suprsendClientRef.current;
      if (suprsendClient?.isIdentified()) {
        suprsendClient?.reset();
      }
    };
  }, [distinctId]);

  useEffect(() => {
    if (userToken) {
      suprsendClientRef.current.userToken = userToken;
    }
  }, [userToken]);

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
