import { ReactNode, Dispatch, SetStateAction } from 'react';
import SuprSend, {
  RefreshTokenCallback,
  Feed,
  IFeedData,
  IFeedOptions,
} from '@suprsend/web-sdk';

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

export interface IAuthenticateUserOptions {
  distinctId: unknown;
  userToken?: string;
  refreshUserToken?: RefreshTokenCallback;
}

export interface IHandleUserAuthenticationOptions
  extends IAuthenticateUserOptions {
  suprsendClient: SuprSend;
}

export interface SuprSendFeedContextProps {
  feedClient?: Feed;
  feedData?: IFeedData;
}

export interface SuprSendFeedProviderProps extends IFeedOptions {
  children: ReactNode;
}
