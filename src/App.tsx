import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Header from "./components/feature/Header";
import Footer from "./components/feature/Footer";
import ScrollToTop from "./components/feature/ScrollToTop";
import Cursor from "./components/feature/Cursor";
import AuthModal from "./components/feature/AuthModal";
import Analytics from "./components/feature/Analytics";
import { LeadProvider } from "./hooks/useLead";

/**
 * The site's chrome, minus /dashboard. The dashboard is a private admin page
 * with its own navigation: the public header and footer would be noise there,
 * and the analytics tag would record every look at the traffic AS traffic.
 */
function Frame() {
  const { pathname } = useLocation();

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
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <LeadProvider>
        <BrowserRouter basename={__BASE_PATH__}>
          <Frame />
        </BrowserRouter>
      </LeadProvider>
    </I18nextProvider>
  );
}

export default App;
