import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IFeedOptions, Feed, IFeedData } from '@suprsend/web-sdk';
import { SuprSendContext, useSuprSendClient } from '../../core';

interface SuprSendFeedContextProps {
  feedClient?: Feed;
  feedData?: IFeedData;
}

interface SuprSendProviderProps extends IFeedOptions {
  children: ReactNode;
}

export const SuprSendFeedContext =
  createContext<SuprSendFeedContextProps | null>(null);

function SuprSendFeedProvider({
  tenantId,
  stores,
  host,
  pageSize,
  children,
}: SuprSendProviderProps) {
  const suprsendClient = useSuprSendClient();
  const ssContext = useContext(SuprSendContext);

  const feedClientRef = useRef<Feed>();
  const [feedData, setFeedData] = useState<IFeedData>();

  useEffect(() => {
    const existingFeedClient = feedClientRef.current;
    if (existingFeedClient) {
      existingFeedClient.remove();
    }

    if (!ssContext.authenticatedUser) return;

    feedClientRef.current = suprsendClient.feeds.initialize({
      tenantId,
      stores,
      host,
      pageSize,
    });

    const feedClient = feedClientRef.current;
    const initialFeedData = feedClient?.data;
    setFeedData(initialFeedData);

    feedClient?.emitter.on('feed.store_update', (updatedStoreData) => {
      setFeedData(updatedStoreData);
    });

    feedClient.initializeSocketConnection();
  }, [ssContext.authenticatedUser]);

  return (
    <SuprSendFeedContext.Provider
      value={{ feedClient: feedClientRef.current, feedData }}
    >
      {children}
    </SuprSendFeedContext.Provider>
  );
}

export default SuprSendFeedProvider;
