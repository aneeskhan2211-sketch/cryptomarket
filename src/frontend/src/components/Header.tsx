import { ProfileSetupModal } from "@/components/ProfileSetupModal";
import { useSettings } from "@/contexts/SettingsContext";
import { useUserProfile } from "@/lib/api";
import type { UserProfile } from "@/types/profile";
import { isProfileComplete } from "@/types/profile";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";

interface HeaderProps {
  lastUpdated: Date | null;
  isLive?: boolean;
  isLoading: boolean;
}

export function Header({ lastUpdated, isLive, isLoading }: HeaderProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { settings } = useSettings();

  const { data: profile } = useUserProfile();
  const [showSetup, setShowSetup] = useState(false);

  // After login: if profile not set up yet, show the setup modal once.
  useEffect(() => {
    if (
      isAuthenticated &&
      profile !== undefined &&
      !isProfileComplete(profile as UserProfile | null)
    ) {
      setShowSetup(true);
    }
  }, [isAuthenticated, profile]);

  const locale =
    settings.language === "de"
      ? "de-DE"
      : settings.language === "es"
        ? "es-ES"
        : settings.language === "fr"
          ? "fr-FR"
          : "en-US";

  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <>
      <header className="bg-card border-b border-border/60 sticky top-0 z-40 backdrop-blur-sm supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Branding */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <span className="text-[13px] font-display font-bold text-primary">
                ₿
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-[17px] tracking-tight text-foreground truncate block">
                CryptoMarket
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:block">
                On-Chain · ICP
              </span>
            </div>
          </div>

          {/* Right side: live status + last-updated time */}
          <div className="flex items-center gap-2.5 shrink-0">
            {typeof isLive === "boolean" && (
              <span
                className="flex items-center gap-1.5"
                data-ocid="header.live_status"
                title={isLive ? "Live" : "Verbindung unterbrochen"}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isLive
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-muted-foreground/50"
                  }`}
                />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:block">
                  {isLive ? "Live" : "Stale"}
                </span>
              </span>
            )}
            {timeStr && !isLoading && (
              <span
                className="text-[11px] text-muted-foreground font-mono hidden sm:block"
                data-ocid="header.last_updated"
              >
                {timeStr}
              </span>
            )}
            {isLoading && (
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
            )}
          </div>
        </div>
      </header>

      {/* Profile setup modal — shown after first login if profile incomplete */}
      <ProfileSetupModal
        open={showSetup}
        onClose={() => setShowSetup(false)}
        existingProfile={(profile as UserProfile | null) ?? null}
        isSetup
      />
    </>
  );
}
