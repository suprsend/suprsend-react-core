import { useContext } from 'react';
import { SuprSendFeedContext } from '../context/SuprSendFeedProvider';

function useFeedData() {
  const context = useContext(SuprSendFeedContext);

  return context?.feedData;
}

export default useFeedData;
