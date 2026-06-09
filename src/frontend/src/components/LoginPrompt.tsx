import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LockKeyholeIcon, LogIn } from "lucide-react";

interface LoginPromptProps {
  /** Translation key for the title. Defaults to a generic "login required". */
  titleKey?: string;
  /** Translation key for the description. */
  descKey?: string;
}

/**
 * Shown wherever an account-bound feature (watchlist, portfolio) is accessed
 * while logged out. Triggers the Internet Identity login flow directly.
 */
export function LoginPrompt({
  titleKey = "login.required",
  descKey,
}: LoginPromptProps) {
  const { login } = useInternetIdentity();
  const { t } = useSettings();
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6"
      data-ocid="login_prompt"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
        <LockKeyholeIcon className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-lg font-display font-bold text-foreground">
        {t(titleKey)}
      </h2>
      {descKey && (
        <p className="text-sm text-muted-foreground max-w-md">{t(descKey)}</p>
      )}
      <Button
        onClick={login}
        className="gap-1.5 mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
        data-ocid="login_prompt.login_button"
      >
        <LogIn className="h-4 w-4" />
        {t("login.button")}
      </Button>
    </div>
  );
}
