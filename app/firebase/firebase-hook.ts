import { useEffect, useState } from 'react';
import { initializeFirebaseAsync } from './firebase';

export function useFirebase() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function initialize() {
      await initializeFirebaseAsync();
      setInitialized(true);
    }

    initialize();
  }, []);

  return initialized;
}
