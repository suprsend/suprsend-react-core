import { useContext } from 'react';
import {
  IHandleUserAuthenticationOptions,
  IAuthenticateUserOptions,
} from '../../interface';
import useSuprSendClient from './useSuprSendClient';
import { SuprSendContext } from '../context';

export async function authenticateUser({
  distinctId,
  userToken,
  refreshUserToken,
  suprsendClient,
}: IHandleUserAuthenticationOptions) {
  if (
    suprsendClient.isIdentified() &&
    suprsendClient?.distinctId != distinctId
  ) {
    await suprsendClient?.reset();
    await suprsendClient.identify(distinctId, userToken, { refreshUserToken });
  }
  await suprsendClient.identify(distinctId, userToken, { refreshUserToken });
  return suprsendClient.isIdentified();
}

function useAuthenticateUser() {
  const suprsendClient = useSuprSendClient();
  const ssContext = useContext(SuprSendContext);

  const handleUserAuthentication = async ({
    distinctId,
    userToken,
    refreshUserToken,
  }: IAuthenticateUserOptions) => {
    const authenticationStatus = await authenticateUser({
      distinctId,
      userToken,
      refreshUserToken,
      suprsendClient,
    });
    if (ssContext.setAuthenticatedUser) {
      ssContext.setAuthenticatedUser(authenticationStatus ? distinctId : null);
    }
  };

  return {
    authenticateUser: handleUserAuthentication,
  };
}

export default useAuthenticateUser;
