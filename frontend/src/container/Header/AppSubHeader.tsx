import React, { FC } from "react";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from "@coreui/react-pro";

type AppSubHeaderProps = {
  items: any;
  module: string;
  selectedId: number;
};

const AppSubHeader: FC<AppSubHeaderProps> = ({ items, module, selectedId }) => {
  if (!items || items?.length === 0) {
    return <></>;
  }
  return (
    <CHeader
      position="sticky"
      className="mb-4"
      style={{
        marginTop: "0px",
        marginBottom: "0px",
        padding: "0px",
        width: "100%",
        borderBottom: "1px solid #ddd",
        zIndex: 0,
      }}
    >
      <CContainer fluid>
        <CHeaderNav
          className="d-none d-md-flex me-auto sub-header-ul"
          style={{ border: "0px solid red" }}
        >
          {items?.map((item: any, idx: number) => (
            <CNavItem
              key={item.id}
              className={selectedId == item.id ? "active" : ""}
            >
              <CNavLink
                href={item.href ? `/${module}${item.href}` : "#"}
                style={{ fontSize: "15px" }}
              >
                {item.label}
              </CNavLink>
            </CNavItem>
          ))}
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppSubHeader;
