import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { StartupList } from "../data/mockData";
import { defaultLists } from "../data/mockData";

interface ListsContextValue {
  lists: StartupList[];
  createList: (
    name: string,
    description?: string,
    color?: string
  ) => StartupList;
  deleteList: (listId: string) => void;
  addStartupToList: (listId: string, startupId: number) => void;
  removeStartupFromList: (listId: string, startupId: number) => void;
  getListsForStartup: (startupId: number) => StartupList[];
}

const ListsContext = createContext<ListsContextValue | null>(null);

export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<StartupList[]>(defaultLists);

  const createList = useCallback(
    (name: string, description?: string, color?: string): StartupList => {
      const newList: StartupList = {
        id: "list-" + Date.now(),
        name,
        description,
        color: color ?? "indigo",
        startupIds: [],
        createdAt: Date.now(),
      };
      setLists((prev) => [...prev, newList]);
      return newList;
    },
    []
  );

  const deleteList = useCallback((listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }, []);

  const addStartupToList = useCallback(
    (listId: string, startupId: number) => {
      setLists((prev) =>
        prev.map((l) =>
          l.id === listId && !l.startupIds.includes(startupId)
            ? { ...l, startupIds: [...l.startupIds, startupId] }
            : l
        )
      );
    },
    []
  );

  const removeStartupFromList = useCallback(
    (listId: string, startupId: number) => {
      setLists((prev) =>
        prev.map((l) =>
          l.id === listId
            ? { ...l, startupIds: l.startupIds.filter((id) => id !== startupId) }
            : l
        )
      );
    },
    []
  );

  const getListsForStartup = useCallback(
    (startupId: number): StartupList[] => {
      return lists.filter((l) => l.startupIds.includes(startupId));
    },
    [lists]
  );

  return (
    <ListsContext.Provider
      value={{
        lists,
        createList,
        deleteList,
        addStartupToList,
        removeStartupFromList,
        getListsForStartup,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists(): ListsContextValue {
  const ctx = useContext(ListsContext);
  if (!ctx) throw new Error("useLists must be used within ListsProvider");
  return ctx;
}
