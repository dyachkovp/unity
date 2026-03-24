import { useSearchParams } from "react-router-dom";
import { useStartups } from "../context/StartupsContext";
import StartupsList from "./StartupsList";
import StartupDetail from "./StartupDetail";

export default function StartupsPage() {
  const { startups } = useStartups();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("selected");
  const selectedStartup = selectedId
    ? startups.find((s) => s.id === Number(selectedId)) ?? null
    : null;

  const handleSelect = (id: number) => {
    setSearchParams({ selected: String(id) });
  };

  const handleClose = () => {
    setSearchParams({});
  };

  const isDetailOpen = !!selectedStartup;

  return (
    <div className={`master-detail ${isDetailOpen ? "detail-open" : ""}`}>
      <div className="master-panel">
        <StartupsList
          compact={isDetailOpen}
          selectedId={selectedStartup?.id ?? null}
          onSelect={handleSelect}
        />
      </div>
      {selectedStartup && (
        <div className="detail-panel">
          <StartupDetail startup={selectedStartup} onClose={handleClose} />
        </div>
      )}
    </div>
  );
}
