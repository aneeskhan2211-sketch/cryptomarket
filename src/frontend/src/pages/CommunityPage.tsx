import { Layout } from "@/components/Layout";
import { useSettings } from "@/contexts/SettingsContext";
import { MessageSquareIcon } from "lucide-react";

export default function CommunityPage() {
  const { t } = useSettings();
  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center gap-3 py-16 text-center px-6"
        data-ocid="community.coming_soon"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <MessageSquareIcon className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-xl font-display font-bold text-foreground">
          {t("community.title")}
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          {t("community.desc")}
        </p>
        <span className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-card border border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
          {t("community.soon")}
        </span>
      </div>
    </Layout>
  );
}
