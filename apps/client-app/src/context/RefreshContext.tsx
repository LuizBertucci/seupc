import { ReactNode, createContext, useCallback, useState } from 'react';

export interface IRefreshContextProps {
  onRefresh: () => void;
  refresh: boolean;
}

export const RefreshContext = createContext<IRefreshContextProps>({} as IRefreshContextProps);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh((prevState) => !prevState);
  }, []);

  return <RefreshContext.Provider value={{ onRefresh, refresh }}>{children}</RefreshContext.Provider>;
};
