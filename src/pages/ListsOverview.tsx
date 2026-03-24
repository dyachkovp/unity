import { useState } from "react";
import { Heading, TextField, Button, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { useLists } from "../context/ListsContext";
import { useStartups } from "../context/StartupsContext";
import CreateListDialog from "../components/CreateListDialog";

interface ListsOverviewProps {
  compact?: boolean;
  selectedId?: string | null;
  onSelect: (id: string) => void;
}

export default function ListsOverview({
  compact = false,
  selectedId = null,
  onSelect,
}: ListsOverviewProps) {
  const { startups } = useStartups();
  const { lists } = useLists();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStartupPreviews = (startupIds: number[]) => {
    return startupIds
      .slice(0, 5)
      .map((id) => startups.find((s) => s.id === id))
      .filter(Boolean);
  };

  const pluralize = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return "стартап";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
      return "стартапа";
    return "стартапов";
  };

  return (
    <div className="lists-overview">
      <div className="content-header">
        <Heading size={compact ? "5" : "7"} mb={compact ? "2" : "4"}>
          Мои списки
        </Heading>

        <div className="search-row" style={{ marginBottom: compact ? 12 : 20 }}>
          <TextField.Root
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size={compact ? "2" : "3"}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </div>

        {!compact && (
          <Button
            size="2"
            onClick={() => setDialogOpen(true)}
            style={{ marginBottom: 20 }}
          >
            <PlusIcon /> Создать список
          </Button>
        )}
      </div>

      <div className={`lists-grid ${compact ? "compact" : ""}`}>
        {filtered.map((list) => {
          const previews = getStartupPreviews(list.startupIds);
          const isSelected = selectedId === list.id;
          return (
            <div
              key={list.id}
              className={`list-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(list.id)}
            >
              <div className="list-card-body">
                <Text weight="bold" size={compact ? "2" : "3"}>
                  {list.name}
                </Text>
                {!compact && list.description && (
                  <Text size="1" color="gray" style={{ marginTop: 4 }}>
                    {list.description}
                  </Text>
                )}
                <div className="list-card-footer">
                  {!compact && (
                    <div className="list-card-logos">
                      {previews.map((s) => (
                        <div
                          key={s!.id}
                          className="list-card-logo"
                          style={{
                            background: `var(--${s!.logoColor}-3)`,
                            color: `var(--${s!.logoColor}-11)`,
                          }}
                        >
                          {s!.logoText.slice(0, 2)}
                        </div>
                      ))}
                    </div>
                  )}
                  <Text size="1" color="gray" className="list-card-count">
                    {list.startupIds.length} {pluralize(list.startupIds.length)}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-state">
            <Text color="gray">
              {search ? "Ничего не найдено" : "У вас пока нет списков"}
            </Text>
          </div>
        )}
      </div>

      <CreateListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
