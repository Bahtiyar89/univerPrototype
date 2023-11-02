import React, { FC } from "react";
import CIcon from "@coreui/icons-react";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "assets/brand/logo";
import AppSubHeader from "./AppSubHeader";
import { Menus, SubMenus } from "MenuUtil";
import {
  getModuleNameFromHash,
  getSubmenuIdFromHash,
} from "../../utils/UriUtil";
import { cilBell, cilEnvelopeOpen, cilList } from "@coreui/icons";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavItem,
  CNavLink,
} from "@coreui/react-pro";

type AppHeaderProps = {
  currHash: string;
};

const AppHeader: FC<AppHeaderProps> = ({ currHash }) => {
  const menuLocation = getModuleNameFromHash(currHash)
  const subMenus = SubMenus[menuLocation] || [];
  const submenuId = getSubmenuIdFromHash(currHash);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid style={{ backgroundColor: "#3399ff", width: "100%" }}>
        <CHeaderBrand className="mx-auto d-md-none" href="/">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav
          className="d-none d-md-flex me-auto"
          style={{ width: "80%", margin: "auto", color: "white" }}
        >
          {Menus?.map((item: any, index: number) => (
            <CNavItem
              key={index}
              className={menuLocation === item.id ? "active" : ""}
            >
              <CNavLink
                style={{ color: "white" }}
                href={item.href ? `${item.href}` : "/404"}
              >
                {item.label}
              </CNavLink>
            </CNavItem>
          ))}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <AppSubHeader
        items={subMenus}
        module={menuLocation}
        selectedId={submenuId}
      />
    </CHeader>
  );
};

export default AppHeader;
