import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CheckIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import type { Startup } from "../data/mockData";
import { useStartups } from "../context/StartupsContext";
import AddToListPopover from "../components/AddToListPopover";
import StartupDetail from "./StartupDetail";
import { useLists } from "../context/ListsContext";
import CreateListDialog from "../components/CreateListDialog";

const exampleQueries = [
  "Стартапы в сфере HealthTech, которые используют ИИ для диагностики заболеваний или персонализации лечения, на стадии MVP или раунда A",
  "Финтех-компании, разрабатывающие решения для автоматизации бухгалтерского учёта малого бизнеса в России",
  "EdTech-стартапы с технологиями адаптивного обучения и геймификации для корпоративного обучения сотрудников",
  "Компании в области Computer Vision для контроля качества на производстве, с готовым продуктом и первыми клиентами",
  "GreenTech-стартапы, работающие над переработкой промышленных отходов или снижением углеродного следа предприятий",
];

const loadingMessages = [
  "Анализирую ваш запрос...",
  "Изучаю базу стартапов...",
  "Подбираю релевантные компании...",
  "Сверяю технологические стеки...",
  "Оцениваю соответствие критериям...",
  "Ранжирую по релевантности...",
  "Проверяю, не пропустил ли кого...",
  "Почти готово, финальная проверка...",
];

type SearchMode = "depth" | "precision";
type PageState = "input" | "loading" | "results";

interface ScoutingResult {
  startup: Startup;
  relevance: number;
}

const depthOptions = [5, 10, 25, 100] as const;

function generateResults(
  pool: Startup[],
  mode: SearchMode,
  depth: number,
  precision: number,
): ScoutingResult[] {
  const all: ScoutingResult[] = [];
  // Assign each startup a relevance score spread across the range
  for (let i = 0; i < pool.length; i++) {
    const baseRelevance = 97 - i * (50 / pool.length);
    const relevance = Math.max(
      51,
      Math.min(99, Math.round(baseRelevance + (Math.random() * 6 - 3)))
    );
    all.push({ startup: pool[i], relevance });
  }
  all.sort((a, b) => b.relevance - a.relevance);

  if (mode === "precision") {
    // Only return startups with relevance >= threshold
    return all.filter((r) => r.relevance >= precision);
  }
  // Depth mode: return top N
  return all.slice(0, Math.min(depth, all.length));
}

function BulkAddToList({ startupIds }: { startupIds: number[] }) {
  const { lists, addStartupToList } = useLists();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addedTo, setAddedTo] = useState<string | null>(null);

  const handleAdd = (listId: string) => {
    startupIds.forEach((id) => addStartupToList(listId, id));
    setAddedTo(listId);
    setTimeout(() => {
      setOpen(false);
      setAddedTo(null);
    }, 800);
  };

  return (
    <>
      <div className="scouting-bulk-add-wrapper">
        <button
          className="scouting-bulk-add-btn"
          onClick={() => setOpen(!open)}
        >
          <BookmarkIcon width={16} height={16} />
          Добавить все в список
        </button>
        {open && (
          <div className="scouting-bulk-add-dropdown">
            {lists.map((list) => (
              <button
                key={list.id}
                className={`scouting-bulk-add-item ${addedTo === list.id ? "added" : ""}`}
                onClick={() => handleAdd(list.id)}
              >
                <span className="scouting-bulk-add-item-name">{list.name}</span>
                {addedTo === list.id && <CheckIcon />}
              </button>
            ))}
            {lists.length === 0 && (
              <span className="scouting-bulk-add-empty">Нет списков</span>
            )}
            <button
              className="scouting-bulk-add-create"
              onClick={() => {
                setOpen(false);
                setDialogOpen(true);
              }}
            >
              <PlusIcon /> Создать список
            </button>
          </div>
        )}
      </div>
      <CreateListDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={(newList) => {
          startupIds.forEach((id) => addStartupToList(newList.id, id));
        }}
      />
    </>
  );
}

export default function ScoutingPage() {
  const { startups } = useStartups();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("depth");
  const [depth, setDepth] = useState<number>(10);
  const [precision, setPrecision] = useState<number>(75);
  const [pageState, setPageState] = useState<PageState>("input");
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [results, setResults] = useState<ScoutingResult[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedResultIdx, setSelectedResultIdx] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const hasQuery = query.trim().length > 0;

  const handleSubmit = useCallback(() => {
    if (!hasQuery) return;
    setSubmittedQuery(query);
    setPageState("loading");
    setLoadingMsgIdx(0);
  }, [hasQuery, query]);

  // Loading message rotation
  useEffect(() => {
    if (pageState !== "loading") return;
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => {
        if (prev >= loadingMessages.length - 1) return prev;
        return prev + 1;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, [pageState]);

  // Finish loading after ~9 seconds
  useEffect(() => {
    if (pageState !== "loading") return;
    timerRef.current = setTimeout(() => {
      setResults(generateResults([...startups], mode, depth, precision));
      setPageState("results");
    }, 9000);
    return () => clearTimeout(timerRef.current);
  }, [pageState, mode, depth, precision]);

  const handleNewSearch = () => {
    setPageState("input");
    setResults([]);
    setSubmittedQuery("");
    setSelectedResultIdx(null);
  };

  // ── Input state ──
  if (pageState === "input") {
    return (
      <div className="scouting-page">
        <div className="scouting-hero">
          <div className="scouting-title-row">
            <h1 className="scouting-title">GigaScout</h1>
            <span className="scouting-beta">beta</span>
          </div>
          <p className="scouting-subtitle">
            Находите релевантные стартапы на Sberunity по текстовому описанию с
            помощью интеллектуального поиска
          </p>

          <div className="scouting-input-wrapper">
            <MagnifyingGlassIcon
              className="scouting-input-icon"
              width={20}
              height={20}
            />
            <textarea
              className="scouting-input"
              placeholder="Опишите, какие стартапы вы ищете..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
            />
          </div>

          <div className={`scouting-examples ${hasQuery ? "hidden" : ""}`}>
            <span className="scouting-examples-label">Примеры запросов:</span>
            <div className="scouting-examples-list">
              {exampleQueries.map((eq, i) => (
                <button
                  key={i}
                  className="scouting-example-chip"
                  onClick={() => setQuery(eq)}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          <div className={`scouting-controls ${hasQuery ? "visible" : ""}`}>
            <div className="scouting-controls-inner">
              <div className="scouting-mode-tabs">
                <button
                  className={`scouting-mode-tab ${mode === "depth" ? "active" : ""}`}
                  onClick={() => setMode("depth")}
                >
                  Глубина
                </button>
                <button
                  className={`scouting-mode-tab ${mode === "precision" ? "active" : ""}`}
                  onClick={() => setMode("precision")}
                >
                  Точность
                </button>
              </div>

              {mode === "depth" && (
                <div className="scouting-depth-options">
                  {depthOptions.map((d) => (
                    <button
                      key={d}
                      className={`scouting-depth-btn ${depth === d ? "active" : ""}`}
                      onClick={() => setDepth(d)}
                    >
                      {d}
                    </button>
                  ))}
                  <span className="scouting-depth-hint">
                    стартапов в результатах
                  </span>
                </div>
              )}

              {mode === "precision" && (
                <div className="scouting-precision-options">
                  <span className="scouting-precision-label">
                    Минимальная релевантность
                  </span>
                  <div className="scouting-precision-row">
                    <input
                      type="range"
                      min={50}
                      max={99}
                      step={1}
                      value={precision}
                      onChange={(e) => setPrecision(Number(e.target.value))}
                      className="scouting-precision-slider"
                    />
                    <span className="scouting-precision-value">
                      {precision}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="scouting-submit-btn"
              disabled={!hasQuery}
              onClick={handleSubmit}
            >
              <MagnifyingGlassIcon width={16} height={16} />
              Начать скаутинг
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading state ──
  if (pageState === "loading") {
    return (
      <div className="scouting-page">
        <div className="scouting-loading">
          <div className="scouting-loading-query">{submittedQuery}</div>
          <div className="scouting-loader">
            <div className="scouting-loader-spinner" />
          </div>
          <div className="scouting-loading-msg" key={loadingMsgIdx}>
            {loadingMessages[loadingMsgIdx]}
          </div>
        </div>
      </div>
    );
  }

  // ── Results state ──
  const resultIds = results.map((r) => r.startup.id);
  const selectedResult =
    selectedResultIdx !== null ? results[selectedResultIdx] : null;
  const isDetailOpen = !!selectedResult;

  return (
    <div className={`master-detail scouting-master-detail ${isDetailOpen ? "detail-open" : ""}`}>
      <div className="master-panel">
        <div className="scouting-results-header">
          <div className="scouting-results-query">{submittedQuery}</div>
          <div className="scouting-results-meta">
            <span>
              Найдено {results.length} стартап
              {results.length === 1
                ? ""
                : results.length < 5
                  ? "а"
                  : "ов"}
            </span>
            <button className="scouting-new-search" onClick={handleNewSearch}>
              <MagnifyingGlassIcon width={14} height={14} />
              Новый поиск
            </button>
          </div>
          {!isDetailOpen && <BulkAddToList startupIds={resultIds} />}
        </div>

        <div className="scouting-results-list">
          {results.map((r, idx) => (
            <div
              key={r.startup.id}
              className={`startup-card scouting-result-card ${selectedResultIdx === idx ? "selected" : ""}`}
              onClick={() => setSelectedResultIdx(idx)}
            >
              <div
                className="startup-logo"
                style={{
                  background: `var(--${r.startup.logoColor}-3)`,
                  color: `var(--${r.startup.logoColor}-11)`,
                }}
              >
                {r.startup.logoText}
              </div>
              <div className="startup-info">
                <div className="startup-name">{r.startup.name}</div>
                {!isDetailOpen && (
                  <div className="startup-desc">
                    {r.startup.shortDescription}
                  </div>
                )}
                <div className="startup-tags">
                  {r.startup.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="soft"
                      color="gray"
                      radius="full"
                      size={isDetailOpen ? "1" : "2"}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {!isDetailOpen && (
                <div className="scouting-relevance">
                  <span className="scouting-relevance-value">
                    {r.relevance}%
                  </span>
                  <span className="scouting-relevance-label">
                    релевантность
                  </span>
                </div>
              )}
              {isDetailOpen && (
                <span className="scouting-relevance-compact">
                  {r.relevance}%
                </span>
              )}
              <div className="startup-card-bookmark">
                <AddToListPopover startupId={r.startup.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedResult && (
        <div className="detail-panel">
          <StartupDetail
            startup={selectedResult.startup}
            onClose={() => setSelectedResultIdx(null)}
          />
        </div>
      )}
    </div>
  );
}
