import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Startup } from "../data/mockData";
import { startups as initialStartups } from "../data/mockData";

interface StartupsContextValue {
  startups: Startup[];
  addStartup: (startup: Startup) => void;
}

const StartupsContext = createContext<StartupsContextValue | null>(null);

export function StartupsProvider({ children }: { children: ReactNode }) {
  const [startups, setStartups] = useState<Startup[]>(initialStartups);

  const addStartup = useCallback((startup: Startup) => {
    setStartups((prev) => [startup, ...prev]);
  }, []);

  return (
    <StartupsContext.Provider value={{ startups, addStartup }}>
      {children}
    </StartupsContext.Provider>
  );
}

export function useStartups(): StartupsContextValue {
  const ctx = useContext(StartupsContext);
  if (!ctx)
    throw new Error("useStartups must be used within StartupsProvider");
  return ctx;
}
