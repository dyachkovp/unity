import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Cross1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useLists } from "../context/ListsContext";
import type { StartupList } from "../data/mockData";
import { useStartups } from "../context/StartupsContext";
import AddToListPopover from "../components/AddToListPopover";

interface ListContentPanelProps {
  list: StartupList;
  compact?: boolean;
  selectedStartupId?: number | null;
  onSelectStartup: (id: number) => void;
  onClose: () => void;
}

export default function ListContentPanel({
  list,
  compact = false,
  selectedStartupId = null,
  onSelectStartup,
  onClose,
}: ListContentPanelProps) {
  const { deleteList, removeStartupFromList } = useLists();
  const { startups: allStartups } = useStartups();

  const listStartups = list.startupIds
    .map((id) => allStartups.find((s) => s.id === id))
    .filter(Boolean);

  const handleDelete = () => {
    deleteList(list.id);
    onClose();
  };

  return (
    <div>
      {/* Header */}
      <Flex align="center" justify="between" mb="2">
        <button className="detail-close-btn" onClick={onClose}>
          <Cross1Icon /> Закрыть
        </button>
        {!compact && (
          <Button variant="soft" color="red" size="1" onClick={handleDelete}>
            <TrashIcon /> Удалить
          </Button>
        )}
      </Flex>

      <Heading size={compact ? "4" : "6"} mb="1">
        {list.name}
      </Heading>

      {!compact && list.description && (
        <Text size="2" color="gray" as="p" mb="2">
          {list.description}
        </Text>
      )}

      <Text size="2" color="gray" as="p" mb="4">
        {listStartups.length}{" "}
        {listStartups.length === 1
          ? "стартап"
          : listStartups.length < 5
          ? "стартапа"
          : "стартапов"}
      </Text>

      {/* Startup cards */}
      <div className="startup-list">
        {listStartups.map((startup) => (
          <div
            key={startup!.id}
            className={`startup-card ${selectedStartupId === startup!.id ? "selected" : ""}`}
            onClick={() => onSelectStartup(startup!.id)}
          >
            <div
              className="startup-logo"
              style={{
                color: `var(--${startup!.logoColor}-11)`,
                background: `var(--${startup!.logoColor}-3)`,
                borderColor: `var(--${startup!.logoColor}-5)`,
              }}
            >
              {startup!.logoText}
            </div>
            <div className="startup-info">
              <div className="startup-name">{startup!.name}</div>
              {!compact && (
                <div className="startup-desc">
                  {startup!.shortDescription}
                </div>
              )}
              <div className="startup-tags">
                {startup!.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    color="gray"
                    size={compact ? "1" : "2"}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="startup-card-bookmark">
              <AddToListPopover startupId={startup!.id} />
            </div>
          </div>
        ))}

        {listStartups.length === 0 && (
          <div className="empty-state">
            <Text color="gray" size="2">
              Список пуст. Добавьте стартапы из раздела «Стартапы».
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
