import { ToastProvider } from "@/components/ToastNotifier";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const MarketPage = lazy(() => import("@/pages/MarketPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const TradePage = lazy(() => import("@/pages/TradePage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const ComparePage = lazy(() => import("@/pages/ComparePage"));

function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex flex-col gap-3 p-6">
      {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6", "sk-7", "sk-8"].map(
        (id) => (
          <Skeleton key={id} className="h-14 w-full rounded-lg" />
        ),
      )}
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <MarketPage />
    </Suspense>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PortfolioPage />
    </Suspense>
  ),
});

const tradeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trade",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TradePage />
    </Suspense>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ReportsPage />
    </Suspense>
  ),
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ComparePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  portfolioRoute,
  tradeRoute,
  reportsRoute,
  compareRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
