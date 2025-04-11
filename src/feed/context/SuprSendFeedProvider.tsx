import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Feed, IFeedData } from '@suprsend/web-sdk';
import { SuprSendContext } from '../../core/context/SuprSendProvider';
import { useSuprSendClient } from '../../core';
import {
  SuprSendFeedContextProps,
  SuprSendFeedProviderProps,
} from '../../interface';

export const SuprSendFeedContext =
  createContext<SuprSendFeedContextProps | null>(null);

function SuprSendFeedProvider({
  tenantId,
  stores,
  host,
  pageSize,
  children,
}: SuprSendFeedProviderProps) {
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
    feedClient.fetch();

    return () => feedClient.remove();
  }, [ssContext.authenticatedUser]);

  return (
    <SuprSendFeedContext.Provider
      value={{ feedClient: feedClientRef.current, feedData, stores }}
    >
      {children}
    </SuprSendFeedContext.Provider>
  );
}

export default SuprSendFeedProvider;
