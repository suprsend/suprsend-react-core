import {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
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
import {
  name as SDK_NAME,
  version as SDK_VERSION,
} from '../../../package.json';

export const SuprSendContext = createContext<SuprSendContextProps>({
  suprsendClient: undefined,
  authenticatedUser: undefined,
  setAuthenticatedUser: undefined,
  tenantId: undefined,
});

// no-op on server where layout effects don't run, avoids SSR warning
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function SuprSendProvider({
  publicApiKey,
  distinctId,
  userToken,
  tenantId,
  host,
  vapidKey,
  swFileName,
  appInfo,
  clientUserAgent,
  refreshUserToken,
  children,
  userAuthenticationHandler,
  createUser,
}: SuprSendProviderProps) {
  const createSSClient = () => {
    return new SuprSend(publicApiKey, {
      host,
      vapidKey,
      swFileName,
      appInfo,
      clientUserAgent: {
        sdk: SDK_NAME,
        sdk_version: SDK_VERSION,
        ...clientUserAgent,
      },
    });
  };

  const suprsendClientRef = useRef<SuprSend>(createSSClient());
  const tenantIdRef = useRef(tenantId);
  const [authenticatedUser, setAuthenticatedUser] = useState<unknown>(null);

  const handleInternalUserAuthentication = async () => {
    const suprsendClient = suprsendClientRef.current;
    const existingUser = suprsendClient.distinctId;

    const response = await authenticateUser({
      distinctId,
      userToken,
      tenantId: tenantIdRef.current,
      refreshUserToken,
      createUser,
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

  useIsomorphicLayoutEffect(() => {
    if (userToken) {
      suprsendClientRef.current.userToken = userToken;
    }
  }, [userToken]);

  useIsomorphicLayoutEffect(() => {
    tenantIdRef.current = tenantId;

    if (suprsendClientRef.current.isIdentified()) {
      suprsendClientRef.current.changeTenant(tenantId ?? null);
    }
  }, [tenantId]);

  return (
    <SuprSendContext.Provider
      value={{
        suprsendClient: suprsendClientRef.current,
        authenticatedUser,
        setAuthenticatedUser,
        tenantId,
      }}
    >
      {children}
    </SuprSendContext.Provider>
  );
}

export default SuprSendProvider;
