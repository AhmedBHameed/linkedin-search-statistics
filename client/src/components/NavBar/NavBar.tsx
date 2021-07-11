import {BarChartOutlined, DashboardOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import NAVIGATION_ROUTES from '../../config/NavigationRoutes';
import {useActiveNavLink} from '../NavBarProvider/hooks/ActiveNavLinkHook';
import useViewport from '../WindowViewport/hooks/windowViewportHook';
import BurgerButton from './BurgerButton';
import useLogout from './hooks/logoutHook';
import ItemLink from './ItemLink';
import LogoutItem from './LogoutItem';
import MobileMenu from './MobileMenu';
import NavBrand from './NavBrand';
import ProfileSubMenu from './ProfileSubMenu';
import {spaceXSmall, StyledAntdMenu} from './shared/sharedStyles';

const {Header} = Layout;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  ${spaceXSmall}
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

interface NavBarProps {
  isAuthorized?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({isAuthorized}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const {handleLogout} = useLogout();
  const activeIndex = useActiveNavLink();
  const {isTabletOrLarger} = useViewport();

  const openMobileMenu = useCallback(() => {
    setOpenMenu(true);
  }, [setOpenMenu]);

  const closeMobileMenu = useCallback(() => {
    setOpenMenu(false);
  }, [setOpenMenu]);

  return (
    <>
      <StyledHeader className="header">
        <NavBrand />
        {/* <BanMenuContainer> */}
        <ItemsContainer>
          {isTabletOrLarger && (
            <StyledAntdMenu
              data-testid="tablet-navbar"
              mode="horizontal"
              selectedKeys={[activeIndex]}
            >
              {isAuthorized && (
                <ItemLink
                  icon={<DashboardOutlined />}
                  key="1"
                  label="Dashboard"
                  to={NAVIGATION_ROUTES.dashboard.path}
                />
              )}

              <ItemLink
                icon={<BarChartOutlined />}
                key="2"
                label="Statistics"
                to={NAVIGATION_ROUTES.statistics.path}
              />
            </StyledAntdMenu>
          )}
        </ItemsContainer>
        {/*
          /**
              {isTabletOrLarger ? (
                <ProfileSubMenu
                  activeIndex={activeIndex}
                  onLogout={handleLogout}
                />
              ) : (
                <BurgerButton onClick={openMobileMenu} />
              )}
           * 
           */}
        {isTabletOrLarger && (
          <ProfileSubMenu
            activeIndex={activeIndex}
            loginOrLogoutItemComponent={
              isAuthorized ? (
                <LogoutItem
                  key="9"
                  label="Logout"
                  onClick={handleLogout}
                  testId="navbar-logout-item"
                />
              ) : (
                <ItemLink
                  key="9"
                  label="Login"
                  to={NAVIGATION_ROUTES.login.path}
                />
              )
            }
          />
        )}
        {!isTabletOrLarger && <BurgerButton onClick={openMobileMenu} />}
        {/* </BanMenuContainer> */}
      </StyledHeader>

      {!isTabletOrLarger && (
        <MobileMenu
          activeIndex={activeIndex}
          isAuthorized={isAuthorized}
          onClose={closeMobileMenu}
          onLogout={handleLogout}
          open={openMenu}
        />
      )}
    </>
  );
};

export default NavBar;
