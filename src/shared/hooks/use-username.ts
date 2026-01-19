import { useEffect, useState } from 'react';
import { generateUsername } from '../utils/username/generate';
import { STORAGE_KEY } from '../constants/localstorage';

export const useUsername = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setUsername(stored);
        return;
      }

      const generated = generateUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    };

    main();
  }, []);

  return { username };
};
