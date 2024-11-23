import { useContext } from 'react';
import { SuprSendFeedContext } from '../context';

function useFeedClient() {
  const context = useContext(SuprSendFeedContext);

  if (context === undefined) {
    throw new Error(
      'useFeedClient must be used within a SuprSendProvider and SuprSendFeedProvider'
    );
  }

  return context?.feedClient;
}

export default useFeedClient;
