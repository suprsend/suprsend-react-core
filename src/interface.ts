import { ReactNode, Dispatch, SetStateAction } from 'react';
import SuprSend, { RefreshTokenCallback } from '@suprsend/web-sdk';

export interface SuprSendContextProps {
  suprsendClient: SuprSend | undefined;
  authenticatedUser: unknown;
  setAuthenticatedUser: Dispatch<SetStateAction<unknown>> | undefined;
}

export interface SuprSendProviderProps {
  publicApiKey: string;
  distinctId?: unknown;
  userToken?: string;
  host?: string;
  vapidKey?: string;
  swFileName?: string;
  refreshUserToken?: RefreshTokenCallback;
  children: ReactNode;
}
