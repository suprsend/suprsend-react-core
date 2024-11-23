import { useContext } from 'react';
import { SuprSendFeedContext } from '../context';

function useFeedData() {
  const context = useContext(SuprSendFeedContext);

  return context?.feedData;
}

export default useFeedData;
