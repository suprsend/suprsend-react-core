import { useContext } from 'react';
import { ApiResponse, AuthenticateOptions } from '@suprsend/web-sdk';
import {
  IHandleUserAuthenticationOptions,
  IAuthenticateUserOptions,
} from '../../interface';
import useSuprSendClient from './useSuprSendClient';
import { SuprSendContext } from '../context/SuprSendProvider';

export async function authenticateUser({
  distinctId,
  userToken,
  refreshUserToken,
  createUser,
  suprsendClient,
}: IHandleUserAuthenticationOptions) {
  let response: ApiResponse;

  if (
    suprsendClient.isIdentified() &&
    suprsendClient?.distinctId != distinctId
  ) {
    response = await suprsendClient?.reset();
    if (distinctId) {
      response = await suprsendClient.identify(distinctId, userToken, {
        refreshUserToken,
        createUser,
      });
    }
  } else {
    response = await suprsendClient.identify(distinctId, userToken, {
      refreshUserToken,
      createUser,
    });
  }

  return response;
}

export const handleUserAuthentication = async ({
  distinctId,
  userToken,
  refreshUserToken,
  createUser,
  suprsendClient,
  setAuthenticatedUser,
}: IHandleUserAuthenticationOptions) => {
  const response = await authenticateUser({
    distinctId,
    userToken,
    refreshUserToken,
    createUser,
    suprsendClient,
  });

  if (setAuthenticatedUser) {
    setAuthenticatedUser(suprsendClient.isIdentified() ? distinctId : null);
  }
  return response;
};

function useAuthenticateUser() {
  const suprsendClient = useSuprSendClient();
  const ssContext = useContext(SuprSendContext);

  return {
    authenticatedUser: ssContext.authenticatedUser,
    authenticateUser: (data: IAuthenticateUserOptions) =>
      handleUserAuthentication({
        ...data,
        suprsendClient: suprsendClient,
        setAuthenticatedUser: ssContext.setAuthenticatedUser,
      }),
  };
}

export default useAuthenticateUser;
