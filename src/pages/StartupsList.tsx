import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  HamburgerMenuIcon,
  DashboardIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { filterCategories } from "../data/mockData";
import { useStartups } from "../context/StartupsContext";
import AddToListPopover from "../components/AddToListPopover";

interface StartupsListProps {
  compact: boolean;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function StartupsList({
  compact,
  selectedId,
  onSelect,
}: StartupsListProps) {
  const { startups } = useStartups();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const toggleFilter = (id: string) => {
    setOpenFilters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFilterOption = (categoryId: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[categoryId] || [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [categoryId]: next };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({});
  };

  const filteredStartups = startups.filter((s) => {
    const q = searchQuery.toLowerCase();
    if (
      q &&
      !s.name.toLowerCase().includes(q) &&
      !s.shortDescription.toLowerCase().includes(q)
    ) {
      return false;
    }
    const techFilters = selectedFilters["technology"] || [];
    if (
      techFilters.length > 0 &&
      !s.tags.some((t) => techFilters.includes(t))
    ) {
      return false;
    }
    return true;
  });

  const hasActiveFilters = Object.values(selectedFilters).some(
    (v) => v.length > 0
  );

  return (
    <>
      <div className="content-header">
        <Flex align="center" justify="between" gap="3">
          <Heading size={compact ? "5" : "8"} weight="bold">
            Стартапы
          </Heading>
          {!compact && (
            <Button
              size="2"
              variant="solid"
              style={{ background: "var(--gray-12)", cursor: "pointer" }}
              onClick={() => navigate("/register-startup")}
            >
              <PlusIcon /> Новый стартап
            </Button>
          )}
        </Flex>
        <div className="search-row">
          <TextField.Root
            size={compact ? "2" : "3"}
            placeholder={
              compact
                ? "Поиск..."
                : "Введите запрос для поиска или воспользуйтесь фильтром"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>

      <div className={compact ? "" : "content-body"}>
        <div>
          {!compact && (
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <HamburgerMenuIcon width={18} height={18} />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <DashboardIcon width={18} height={18} />
              </button>
            </div>
          )}

          <div
            className={`startup-list ${!compact && viewMode === "grid" ? "grid-view" : ""}`}
          >
            {filteredStartups.map((startup) => (
              <div
                key={startup.id}
                className={`startup-card ${selectedId === startup.id ? "selected" : ""}`}
                onClick={() => onSelect(startup.id)}
              >
                <div
                  className="startup-logo"
                  style={{
                    color: `var(--${startup.logoColor}-11)`,
                    background: `var(--${startup.logoColor}-3)`,
                    borderColor: `var(--${startup.logoColor}-5)`,
                  }}
                >
                  {startup.logoText}
                </div>
                <div className="startup-info">
                  <div className="startup-name">{startup.name}</div>
                  {!compact && (
                    <div className="startup-desc">
                      {startup.shortDescription}
                    </div>
                  )}
                  <div className="startup-tags">
                    {startup.tags.map((tag) => (
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
                  <AddToListPopover startupId={startup.id} />
                </div>
              </div>
            ))}

            {filteredStartups.length === 0 && (
              <Flex
                align="center"
                justify="center"
                py="9"
                direction="column"
                gap="2"
              >
                <Text size="3" color="gray">
                  Стартапы не найдены
                </Text>
                <Text size="2" color="gray">
                  Попробуйте изменить запрос или сбросить фильтры
                </Text>
              </Flex>
            )}
          </div>
        </div>

        {/* Filter Panel — only in full mode */}
        {!compact && (
          <div className="filter-panel">
            {filterCategories.map((cat) => (
              <div key={cat.id} className="filter-section">
                <div
                  className={`filter-header ${openFilters[cat.id] ? "open" : ""}`}
                  onClick={() => toggleFilter(cat.id)}
                >
                  <span>{cat.label}</span>
                  <ChevronDownIcon />
                </div>
                {openFilters[cat.id] && (
                  <div className="filter-options">
                    {cat.options.map((opt) => (
                      <Text as="label" size="2" key={opt}>
                        <Flex gap="2" align="center">
                          <Checkbox
                            size="2"
                            checked={(
                              selectedFilters[cat.id] || []
                            ).includes(opt)}
                            onCheckedChange={() =>
                              toggleFilterOption(cat.id, opt)
                            }
                          />
                          {opt}
                        </Flex>
                      </Text>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="filter-actions">
              <Button
                size="3"
                style={{
                  width: "100%",
                  background: "var(--gray-12)",
                  color: "#fff",
                }}
              >
                Применить фильтры
              </Button>
              {hasActiveFilters && (
                <button className="filter-reset" onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
