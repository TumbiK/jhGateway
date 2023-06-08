import React from 'react';
import { useContext } from 'react';
import Scrollbar from '../../../components/Scrollbar';
import { SidebarContext } from '../../../contexts/SidebarContext';

import { Box, Drawer, alpha, styled, Divider, useTheme, Button, lighten, darken, Tooltip } from '@mui/material';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from '../../../../config/constants';
import SidebarMenu from './SidebarMenu';
import Logo from '../../../../shared/components/LogoSign';
import { useAppDispatch, useAppSelector } from '../../../../config/store';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
         background:  ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isHR = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.HR]));
  const isFinance = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.FINANCE]));
  const isEmployee = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.EMPLOYEE]));

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block',
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark' ? alpha(lighten(theme.header.background, 0.1), 0.5) : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow: theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none',
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52,
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu isAuthenticated={isAuthenticated} isAdmin={isAdmin} isEmployee={isEmployee} isFinance={isFinance} isHR={isHR} />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box p={2}>NITEL</Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: theme.palette.mode === 'dark' ? theme.colors.alpha.white[100] : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu isAuthenticated={isAuthenticated} isAdmin={isAdmin} isEmployee={isHR} isFinance={isFinance} isHR={isHR} />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
