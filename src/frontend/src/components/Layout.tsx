import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  lastUpdated?: Date | null;
  isLive?: boolean;
  isLoading?: boolean;
  /** Suppress site header on full-bleed pages. Default: render header. */
  noHeader?: boolean;
}

export function Layout({
  children,
  lastUpdated = null,
  isLive = false,
  isLoading = false,
  noHeader = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!noHeader && (
        <Header
          lastUpdated={lastUpdated}
          isLive={isLive}
          isLoading={isLoading}
        />
      )}
      {/*
        Bottom padding equals nav height (~64px) + safe-area inset so content
        never hides behind the fixed BottomNav.
      */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-[calc(72px+env(safe-area-inset-bottom))]">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
