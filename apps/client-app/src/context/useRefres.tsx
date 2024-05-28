import { useContext } from 'react';
import { IRefreshContextProps, RefreshContext } from './RefreshContext';

export const useRefresh = (): IRefreshContextProps => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }

  const { onRefresh, refresh } = context;

  return { onRefresh, refresh };
};
