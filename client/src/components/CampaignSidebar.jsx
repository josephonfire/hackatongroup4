import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import "../styles/CampaignSidebar.css";

export default function CampaignSidebar({
  campaigns,
  selected,
  onSelect,
  onBgToggle,
  sidebarBg,
  sidebarText,
  setView,
  view,
  whiteBg,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  // Sidebar fixa para desktop
  const SidebarDesktop = (
    <aside className="campaign-sidebar-desktop">
      <div className="campaign-sidebar-header">
        <span
          className="campaign-sidebar-title"
          style={{ color: sidebarText || "#fff" }}
        >
          AdCharter
        </span>
        <button
          onClick={onBgToggle}
          aria-label="Alternar tema"
          className="campaign-sidebar-theme-btn"
          style={{ color: sidebarText === "#fff" ? "#fff" : "#222e3c" }}
        >
          {whiteBg ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="campaign-sidebar-list">
        {campaigns.map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={
              "campaign-sidebar-btn" + (selected === name ? " selected" : "")
            }
          >
            {name}
          </button>
        ))}
      </div>
      <div className="campaign-sidebar-nav">
        <button
          onClick={() => setView("dashboard")}
          className={
            "campaign-sidebar-btn" + (view === "dashboard" ? " selected" : "")
          }
        >
          Dashboard
        </button>
        <button
          onClick={() => setView("pdf")}
          className={
            "campaign-sidebar-btn" + (view === "pdf" ? " selected" : "")
          }
        >
          Export PDF
        </button>
        <button
          onClick={() => setView("future")}
          className={
            "campaign-sidebar-btn" + (view === "future" ? " selected" : "")
          }
        >
          Future Graphs
        </button>
        <button
          onClick={() => setView("piecharts")}
          className={
            "campaign-sidebar-btn" + (view === "piecharts" ? " selected" : "")
          }
        >
          PieCharts
        </button>
        <button
          onClick={() => setView("profile")}
          className={
            "campaign-sidebar-btn" + (view === "profile" ? " selected" : "")
          }
        >
          Profile
        </button>
      </div>
    </aside>
  );

  // Sidebar mobile/overlay
  const SidebarMobile = (
    <AriaDialogTrigger>
      <header className="campaign-sidebar-mobile-header">
        <span
          className="campaign-sidebar-title"
          style={{ color: sidebarText || "#fff" }}
        >
          AdCharts
        </span>
        <AriaButton
          aria-label="Expand navigation menu"
          className="campaign-sidebar-mobile-menu-btn"
        >
          <MenuIcon style={{ width: 24, height: 24 }} />
        </AriaButton>
      </header>
      <AriaModalOverlay
        isDismissable
        className="campaign-sidebar-modal-overlay"
      >
        {({ state }) => (
          <>
            <AriaButton
              aria-label="Close navigation menu"
              onPress={() => state.close()}
              className="campaign-sidebar-modal-close-btn"
            >
              <CloseIcon style={{ width: 24, height: 24 }} />
            </AriaButton>
            <AriaModal className="campaign-sidebar-modal">
              <AriaDialog>
                <div
                  className="campaign-sidebar-header"
                  style={{ marginBottom: 16 }}
                >
                  <span className="campaign-sidebar-title">AdCharts</span>
                  <button
                    onClick={onBgToggle}
                    aria-label="Alternar tema"
                    className="campaign-sidebar-theme-btn"
                    style={{
                      color: sidebarText === "#fff" ? "#fff" : "#222e3c",
                    }}
                  >
                    {whiteBg ? (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="campaign-sidebar-list">
                  {campaigns.map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        onSelect(name);
                        state.close();
                      }}
                      className={
                        "campaign-sidebar-btn" +
                        (selected === name ? " selected" : "")
                      }
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <div className="campaign-sidebar-nav">
                  <button
                    onClick={() => {
                      setView("dashboard");
                      state.close();
                    }}
                    className={
                      "campaign-sidebar-btn" +
                      (view === "dashboard" ? " selected" : "")
                    }
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setView("pdf");
                      state.close();
                    }}
                    className={
                      "campaign-sidebar-btn" +
                      (view === "pdf" ? " selected" : "")
                    }
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={() => {
                      setView("future");
                      state.close();
                    }}
                    className={
                      "campaign-sidebar-btn" +
                      (view === "future" ? " selected" : "")
                    }
                  >
                    Future Graphs
                  </button>
                  <button
                    onClick={() => {
                      setView("piecharts");
                      state.close();
                    }}
                    className={
                      "campaign-sidebar-btn" +
                      (view === "piecharts" ? " selected" : "")
                    }
                  >
                    PieCharts
                  </button>
                  <button
                    onClick={() => {
                      setView("profile");
                      state.close();
                    }}
                    className={
                      "campaign-sidebar-btn" +
                      (view === "profile" ? " selected" : "")
                    }
                  >
                    Profile
                  </button>
                </div>
              </AriaDialog>
            </AriaModal>
          </>
        )}
      </AriaModalOverlay>
    </AriaDialogTrigger>
  );

  return (
    <>
      {SidebarDesktop}
      {SidebarMobile}
    </>
  );
}
