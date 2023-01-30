import { createContext, useCallback, useState } from "react";

export interface IQueryKeyContext {
  queryKey: string;
  handleUpdateQueryKey: (queryKey: string) => void;
}

export const QueryKeyContext = createContext<IQueryKeyContext>({
  queryKey: "",
  handleUpdateQueryKey: () => undefined,
});

export const QueryKeyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryKey, setQueryKey] = useState("");

  const handleUpdateQueryKey = useCallback((queryKey: string) => {
    setQueryKey(queryKey);
  }, []);

  return (
    <QueryKeyContext.Provider value={{ queryKey, handleUpdateQueryKey }}>
      {children}
    </QueryKeyContext.Provider>
  );
};
