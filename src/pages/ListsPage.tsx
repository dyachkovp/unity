import { useState } from "react";
import { useLists } from "../context/ListsContext";
import { useStartups } from "../context/StartupsContext";
import ListsOverview from "./ListsOverview";
import ListContentPanel from "./ListContentPanel";
import StartupDetail from "./StartupDetail";

// Three-panel animated layout:
// Panel A (lists) | Panel B (list content) | Panel C (startup detail)
//
// "idle"             → A=full,   B=hidden, C=hidden
// "list-selected"    → A=narrow, B=full,   C=hidden
// "startup-selected" → A=hidden, B=narrow, C=full

export default function ListsPage() {
  const { startups: allStartups } = useStartups();
  const { lists } = useLists();
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedStartupId, setSelectedStartupId] = useState<number | null>(
    null
  );

  const selectedList = selectedListId
    ? lists.find((l) => l.id === selectedListId) ?? null
    : null;

  const selectedStartup = selectedStartupId
    ? allStartups.find((s) => s.id === selectedStartupId) ?? null
    : null;

  const state: "idle" | "list" | "startup" = selectedStartup
    ? "startup"
    : selectedList
    ? "list"
    : "idle";

  const handleSelectList = (id: string) => {
    setSelectedListId(id);
    setSelectedStartupId(null);
  };

  const handleCloseList = () => {
    setSelectedListId(null);
    setSelectedStartupId(null);
  };

  const handleSelectStartup = (id: number) => {
    setSelectedStartupId(id);
  };

  const handleCloseStartup = () => {
    setSelectedStartupId(null);
  };

  return (
    <div className="lists-tri-panel" data-state={state}>
      {/* Panel A: Lists */}
      <div className="ltp-panel ltp-lists">
        <ListsOverview
          compact={state !== "idle"}
          selectedId={selectedListId}
          onSelect={handleSelectList}
        />
      </div>

      {/* Panel B: List Content (startups in selected list) */}
      <div className="ltp-panel ltp-content">
        {selectedList && (
          <ListContentPanel
            list={selectedList}
            compact={state === "startup"}
            selectedStartupId={selectedStartupId}
            onSelectStartup={handleSelectStartup}
            onClose={handleCloseList}
          />
        )}
      </div>

      {/* Panel C: Startup Detail */}
      <div className="ltp-panel ltp-detail">
        {selectedStartup && (
          <StartupDetail
            startup={selectedStartup}
            onClose={handleCloseStartup}
          />
        )}
      </div>
    </div>
  );
}
