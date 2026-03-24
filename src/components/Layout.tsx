import { useState } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button, DropdownMenu, IconButton } from "@radix-ui/themes";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChatBubbleIcon,
  LockClosedIcon,
  RocketIcon,
  GlobeIcon,
  BarChartIcon,
  PersonIcon,
  BackpackIcon,
  CubeIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import { navItems } from "../data/mockData";

const navIcons: Record<string, React.ReactNode> = {
  startups: <RocketIcon width={18} height={18} />,
  lists: <BookmarkIcon width={18} height={18} />,
  scouting: <GlobeIcon width={18} height={18} />,
  investments: <BarChartIcon width={18} height={18} />,
  clubs: <PersonIcon width={18} height={18} />,
  investors: <BackpackIcon width={18} height={18} />,
  corporations: <CubeIcon width={18} height={18} />,
};

const navRoutes: Record<string, string> = {
  startups: "/",
  lists: "/lists",
  scouting: "/scouting",
  investments: "/investments",
  clubs: "/clubs",
  investors: "/investors",
  corporations: "/corporations",
};

export default function Layout() {
  const [userCollapsed, setUserCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hasSelection = searchParams.has("selected");
  const effectiveCollapsed = userCollapsed || hasSelection;

  const isActive = (id: string) => {
    if (id === "startups") return location.pathname === "/" || location.pathname.startsWith("/startup");
    if (id === "lists") return location.pathname.startsWith("/lists");
    return location.pathname === navRoutes[id];
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${effectiveCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div
            className="sidebar-logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#21a038" />
              <path
                d="M7 12.5C7 9.5 9.5 7 12.5 7C14.5 7 16.2 8.1 17 9.7"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M17 11.5C17 14.5 14.5 17 11.5 17C9.5 17 7.8 15.9 7 14.3"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span>
              <span className="logo-sber">SBER</span>{" "}
              <span className="logo-unity">UNITY</span>
            </span>
          </div>
          <IconButton
            variant="ghost"
            size="1"
            color="gray"
            className="sidebar-collapse-btn"
            onClick={() => setUserCollapsed(!userCollapsed)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={`nav-item ${isActive(item.id) ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(navRoutes[item.id] || "/");
              }}
            >
              <span className="nav-item-icon">{navIcons[item.id]}</span>
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge" />}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a
            className="nav-item"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="nav-item-icon">
              <ChatBubbleIcon width={18} height={18} />
            </span>
            <span>Задать вопрос</span>
          </a>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-banner">
          <LockClosedIcon />
          Ваша анкета на проверке. Доступ к данным ограничен.
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" color="gray" highContrast>
              Дьячков Павел <ChevronDownIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Профиль</DropdownMenu.Item>
            <DropdownMenu.Item>Настройки</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Выйти</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <span className="topbar-lang">EN</span>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
