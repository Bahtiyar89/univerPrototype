import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react-pro";

// routes config
import routes from "../../routes";

const AppContent = () => {
  return (
    <CContainer lg className={"onl"}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes?.map(
            (route, idx) =>
              route.element && (
                <Route
                  key={window.location.hash}
                  path={route.path}
                  element={<route.element />}
                />
              )
          )}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="/login" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
