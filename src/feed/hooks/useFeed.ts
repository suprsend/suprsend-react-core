import { useContext } from 'react';
import { SuprSendFeedContext } from '../context/SuprSendFeedProvider';

function useFeed() {
  const context = useContext(SuprSendFeedContext);

  if (context === undefined) {
    throw new Error(
      'useFeed must be used within a SuprSendProvider and SuprSendFeedProvider'
    );
  }

  return context;
}

export default useFeed;
