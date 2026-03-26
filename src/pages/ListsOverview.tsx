import { useState, useRef } from "react";
import { Heading, TextField, Button, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PlusIcon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useLists } from "../context/ListsContext";

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
  const { lists, reorderList } = useLists();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragNodeRef = useRef<HTMLDivElement | null>(null);

  const filtered = lists.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const pluralize = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return "стартап";
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
      return "стартапа";
    return "стартапов";
  };

  // Empty state — no lists yet
  if (lists.length === 0 && !compact) {
    return (
      <div className="lists-overview">
        <div className="lists-empty-state">
          <div className="lists-empty-illustration">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <rect x="10" y="20" width="60" height="76" rx="8" fill="var(--gray-3)" stroke="var(--gray-6)" strokeWidth="2" />
              <rect x="22" y="34" width="36" height="4" rx="2" fill="var(--gray-6)" />
              <rect x="22" y="44" width="28" height="4" rx="2" fill="var(--gray-5)" />
              <rect x="22" y="54" width="32" height="4" rx="2" fill="var(--gray-5)" />
              <rect x="22" y="68" width="16" height="4" rx="2" fill="var(--green-6)" />
              <rect x="50" y="30" width="60" height="76" rx="8" fill="var(--gray-2)" stroke="var(--gray-5)" strokeWidth="2" />
              <rect x="62" y="44" width="36" height="4" rx="2" fill="var(--gray-6)" />
              <rect x="62" y="54" width="28" height="4" rx="2" fill="var(--gray-5)" />
              <rect x="62" y="64" width="32" height="4" rx="2" fill="var(--gray-5)" />
              <rect x="62" y="78" width="16" height="4" rx="2" fill="var(--green-6)" />
              <circle cx="96" cy="24" r="18" fill="var(--green-3)" stroke="var(--green-6)" strokeWidth="2" />
              <path d="M90 24h12M96 18v12" stroke="var(--green-9)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <Heading size="5" weight="bold" align="center">
            У вас пока нет списков
          </Heading>
          <Text size="3" color="gray" align="center" style={{ maxWidth: 420, lineHeight: 1.6 }}>
            Списки помогают организовать работу со стартапами — группируйте их по
            темам, этапам воронки или направлениям интереса. Добавляйте стартапы
            из каталога, результатов скаутинга или поиска одним кликом.
          </Text>
          <Button
            size="3"
            onClick={() => setDialogOpen(true)}
            style={{ background: "var(--gray-12)", cursor: "pointer", marginTop: 8 }}
          >
            <PlusIcon /> Создать первый список
          </Button>
        </div>
        <CreateListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
    );
  }

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
          const isSelected = selectedId === list.id;
          const realIdx = lists.indexOf(list);
          const isDragging = dragIdx === realIdx;
          const isOver = overIdx === realIdx;
          const canDrag = !search; // disable drag when filtering

          return (
            <div
              key={list.id}
              ref={isDragging ? dragNodeRef : undefined}
              className={`list-card ${isSelected ? "selected" : ""} ${isDragging ? "dragging" : ""} ${isOver ? "drag-over" : ""}`}
              draggable={canDrag}
              onClick={() => onSelect(list.id)}
              onDragStart={(e) => {
                setDragIdx(realIdx);
                e.dataTransfer.effectAllowed = "move";
                if (dragNodeRef.current) {
                  e.dataTransfer.setDragImage(dragNodeRef.current, 0, 0);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dragIdx !== null && realIdx !== dragIdx) {
                  setOverIdx(realIdx);
                }
              }}
              onDragLeave={() => {
                setOverIdx((prev) => (prev === realIdx ? null : prev));
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIdx !== null && realIdx !== dragIdx) {
                  reorderList(dragIdx, realIdx);
                }
                setDragIdx(null);
                setOverIdx(null);
              }}
              onDragEnd={() => {
                setDragIdx(null);
                setOverIdx(null);
              }}
            >
              {canDrag && (
                <div
                  className="list-card-drag-handle"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <DragHandleDots2Icon width={16} height={16} />
                </div>
              )}
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
                  <Text size="1" color="gray" className="list-card-count">
                    {list.startupIds.length} {pluralize(list.startupIds.length)}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && search && (
          <div className="empty-state">
            <Text color="gray">Ничего не найдено</Text>
          </div>
        )}
      </div>

      <CreateListDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
