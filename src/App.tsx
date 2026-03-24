import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import StartupsPage from "./pages/StartupsPage";
import ListsPage from "./pages/ListsPage";
import ScoutingPage from "./pages/ScoutingPage";
import RegisterStartupPage from "./pages/RegisterStartupPage";

import { ListsProvider } from "./context/ListsContext";
import { StartupsProvider } from "./context/StartupsContext";
import "./App.css";

function StartupRedirect() {
  const { id } = useParams();
  return <Navigate to={`/?selected=${id}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <StartupsProvider>
        <ListsProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<StartupsPage />} />
              <Route path="/startup/:id" element={<StartupRedirect />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/scouting" element={<ScoutingPage />} />
              <Route path="/register-startup" element={<RegisterStartupPage />} />
            </Route>
          </Routes>
        </ListsProvider>
      </StartupsProvider>
    </BrowserRouter>
  );
}

export default App;
