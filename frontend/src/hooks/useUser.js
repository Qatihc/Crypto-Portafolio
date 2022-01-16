import React, { useState, useEffect } from 'react';
import { getStoredUser } from '../utils/storedUser';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) setUser(storedUser);
  }, [])

  return [user, setUser];
}

export default useUser;