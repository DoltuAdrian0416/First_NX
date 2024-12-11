import { User } from '@./Models';
import { useEffect, useState } from 'react';
export const useLocalStorageUser = () => {
  //     () => {
  //     const localStorageUser = localStorage.getItem('user');
  //     return localStorageUser ? JSON.parse(localStorageUser) : null;
  //   }

  return { user, setUser };
};
