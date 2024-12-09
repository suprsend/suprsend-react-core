import { useContext } from 'react';
import { SuprSendContext } from '../context/SuprSendProvider';

function useSuprSendClient() {
  const context = useContext(SuprSendContext);

  if (context.suprsendClient === undefined) {
    throw new Error('useSuprSendClient must be used within a SuprSendProvider');
  }

  return context.suprsendClient;
}

export default useSuprSendClient;
