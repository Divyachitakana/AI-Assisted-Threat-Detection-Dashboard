import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { CardSkeleton } from "@/components/common/Skeleton";

// Lazy-loaded so each dashboard section becomes its own JS chunk —
// meaningful once Analytics/Reports pull in Plotly.
const DashboardOverviewPage = lazy(() => import("@/pages/DashboardOverviewPage"));
const ActiveThreatsPage = lazy(() => import("@/pages/ActiveThreatsPage"));
const AlertsPage = lazy(() => import("@/pages/AlertsPage"));
const IncidentsPage = lazy(() => import("@/pages/IncidentsPage"));
const ThreatMapPage = lazy(() => import("@/pages/ThreatMapPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const AiAssistantPage = lazy(() => import("@/pages/AiAssistantPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

function withSuspense(node: React.ReactNode) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      }
    >
      {node}
    </Suspense>
  );
}

// Route paths intentionally mirror src/constants/navigation.ts (NAV_ITEMS)
// one-to-one so the sidebar and the router can never drift apart.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<DashboardOverviewPage />) },
      { path: "threats", element: withSuspense(<ActiveThreatsPage />) },
      { path: "alerts", element: withSuspense(<AlertsPage />) },
      { path: "incidents", element: withSuspense(<IncidentsPage />) },
      { path: "threat-map", element: withSuspense(<ThreatMapPage />) },
      { path: "analytics", element: withSuspense(<AnalyticsPage />) },
      { path: "assistant", element: withSuspense(<AiAssistantPage />) },
      { path: "reports", element: withSuspense(<ReportsPage />) },
      { path: "search", element: withSuspense(<SearchPage />) },
      { path: "settings", element: withSuspense(<SettingsPage />) },
    ],
  },
]);
