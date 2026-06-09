import { SettingsSheet } from "@/components/SettingsSheet";
import { useSettings } from "@/contexts/SettingsContext";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  ScaleIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import { useState } from "react";

/**
 * Bottom navigation bar with four slots: Markets, Portfolio, Trade, and a
 * Profile/Settings button on the far right.
 *
 * The profile button always shows a neutral person icon — never the user's
 * profile picture — and there is no separate "sign in" button. Tapping it opens
 * the settings sheet, which itself surfaces login/profile actions.
 */
export function BottomNav() {
  const { location } = useRouterState();
  const current = location.pathname;
  const { t } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navItems = [
    {
      to: "/",
      label: t("nav.markets"),
      key: "markets",
      icon: <BarChart3Icon className="w-5 h-5" />,
    },
    {
      to: "/portfolio",
      label: t("nav.portfolio"),
      key: "portfolio",
      icon: <WalletIcon className="w-5 h-5" />,
    },
    {
      to: "/trade",
      label: t("nav.trade"),
      key: "trade",
      icon: <ArrowLeftRightIcon className="w-5 h-5" />,
    },
    {
      to: "/community",
      label: t("nav.community"),
      key: "reports",
      icon: <BarChart3Icon className="w-5 h-5" />,
    },
    {
      to: "/compare",
      label: t("nav.compare"),
      key: "compare",
      icon: <ScaleIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border/60 pb-[env(safe-area-inset-bottom)]"
        data-ocid="bottomNav.container"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-6">
          {navItems.map((item) => {
            const active =
              item.to === "/" ? current === "/" : current.startsWith(item.to);
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`bottomNav.item.${item.key}`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                    active ? "bg-primary/15" : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Profile / settings — always a neutral icon, opens settings sheet */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="bottomNav.item.profile"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors">
              <UserIcon className="w-5 h-5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {t("nav.profile")}
            </span>
          </button>
        </div>
      </nav>

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
