import { AppFooter, AppContent, AppHeader, AppSidebar } from "container";
import { useLocation } from "react-router-dom";

const DefaultLayout = () => {
  const location = useLocation();

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader currHash={location?.pathname} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </>
  );
};

export default DefaultLayout;
