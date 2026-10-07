import { BrowserRouter, StaticRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Header from "./components/feature/Header";
import Footer from "./components/feature/Footer";
import ScrollToTop from "./components/feature/ScrollToTop";
import Cursor from "./components/feature/Cursor";
import AuthModal from "./components/feature/AuthModal";
import ScheduleModal from "./components/feature/ScheduleModal";
import { LeadProvider } from "./hooks/useLead";
import { useRouteMeta } from "./hooks/useRouteMeta";


function Frame() {
  const { pathname } = useLocation();
  useRouteMeta(pathname);

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <ScrollToTop />
      <Cursor />
      <AuthModal />
      <ScheduleModal />
    </div>
  );
}


function App({ location }: { location?: string }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LeadProvider>
        {location === undefined ? (
          <BrowserRouter basename={__BASE_PATH__}>
            <Frame />
          </BrowserRouter>
        ) : (
          <StaticRouter location={location} basename={__BASE_PATH__}>
            <Frame />
          </StaticRouter>
        )}
      </LeadProvider>
    </I18nextProvider>
  );
}

export default App;
