import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { AppHeaderDropdown } from "./header/index";
import { logo } from "assets/brand/logo";
import AppSubHeader from "./AppSubHeader";
import { Menus, SubMenus } from "MenuUtil";
import {
  getModuleNameFromHash,
  getSubmenuIdFromHash,
} from "../../utils/UriUtil";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react-pro";
import { useDispatch, useSelector } from "react-redux";

type AppHeaderProps = {
  currHash: string;
};

const AppHeader: FC<AppHeaderProps> = ({ currHash }) => {
  const menuLocation = getModuleNameFromHash(currHash);
  const subMenus = SubMenus[menuLocation] || [];
  const submenuId = getSubmenuIdFromHash(currHash);

  return (
    <CHeader
      position="sticky"
      style={{ paddingRight: "40px" }}
      className="mb-4"
    >
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" href="/">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {Menus?.map((item: any, index: number) => (
            <CNavItem
              key={index}
              className={menuLocation === item.id ? "active" : ""}
            >
              <CNavLink href={item.href ? `${item.href}` : "/404"}>
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
