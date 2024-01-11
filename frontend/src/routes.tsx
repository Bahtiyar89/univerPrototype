import { DemoGridPage } from "./pages";
import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const TabletPage = React.lazy(() => import("./pages/TabletPage"));
const DemoViewPage = React.lazy(() => import("./pages/crm/demo/view"));
const MapViewPage = React.lazy(() => import("pages/Map/MapPage"));
const ChartViewPage = React.lazy(() => import("pages/Chart/ChartPage"));
const UploadFilePage = React.lazy(() => import("./pages/UploadFilePage"));
const WellsPage = React.lazy(() => import("./pages/WellsPage"));

const routes = [
  { path: "/", name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  {
    path: "/crm/list-demonstration",
    name: "Demonstration",
    element: DemoGridPage,
  },
  { path: "/tablet", name: "Tablet", element: TabletPage },
  {
    path: "/crm/list-demonstration/id",
    name: "Demonstration",
    element: DemoViewPage,
  },
  { path: "/uploadfile", name: "UploadFile", element: UploadFilePage },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: "/theme/map", name: "Colors", element: MapViewPage },
  { path: "/theme/chart", name: "Typography", element: ChartViewPage },
  { path: "/theme/typography", name: "Typography", element: DemoViewPage },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: DemoViewPage },
  { path: "/base/wells", name: "Breadcrumbs", element: WellsPage },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/spinners', name: 'Spinners', element: Spinners },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  // { path: '/charts', name: 'Charts', element: Charts },

  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  // { path: '/widgets', name: 'Widgets', element: Widgets },
];

export default routes;
