import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

  const activeTenantId = tenantId || ssContext.tenantId;

  const initializeFeed = useCallback(() => {
    feedClientRef.current?.remove();
    feedClientRef.current = undefined;

    if (!ssContext.authenticatedUser) return;

    const feedClient = suprsendClient.feeds.initialize({
      tenantId: activeTenantId,
      stores,
      host,
      pageSize,
    });
    feedClientRef.current = feedClient;

    setFeedData(feedClient?.data);

    feedClient?.emitter.on('feed.store_update', (updatedStoreData) => {
      setFeedData(updatedStoreData);
    });

    feedClient.initializeSocketConnection();
    feedClient.fetch();
  }, [
    ssContext.authenticatedUser,
    suprsendClient,
    activeTenantId,
    stores,
    host,
    pageSize,
  ]);

  useEffect(() => {
    initializeFeed();
    return () => {
      feedClientRef.current?.remove();
      feedClientRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssContext.authenticatedUser, activeTenantId]);

  const refresh = initializeFeed;

  return (
    <SuprSendFeedContext.Provider
      value={{ feedClient: feedClientRef.current, feedData, stores, refresh }}
    >
      {children}
    </SuprSendFeedContext.Provider>
  );
}

export default SuprSendFeedProvider;
