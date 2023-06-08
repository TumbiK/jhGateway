import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { store } from '@risingstack/react-easy-state';
import { ListSubheader, alpha, Box, List, styled, Button, ListItem } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from '../../../../contexts/SidebarContext';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import subMenuStore from '../menuStore';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isHR: boolean;
  isEmployee: boolean;
  isFinance: boolean;
}

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }

        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.black[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.black[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }

          .MuiButton-endIcon {
            color: ${theme.colors.alpha.black[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.black[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.black[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.black[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu(props: IHeaderProps) {
  const { closeSidebar } = useContext(SidebarContext);
  const [open, setOpen] = React.useState(true);
  const [subMenu, setSubMenu] = React.useState(0);

  //Global state variables

  useEffect(() => {
    const item = window.localStorage.getItem('subMenu');
    setSubMenu(JSON.parse(item !== null ? JSON.parse(item) : {}));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('subMenu', JSON.stringify(subMenu));
  }, [subMenu]);

  const handleSubMenu = menu => event => {
    setSubMenu(menu);
    subMenuStore.subMenu = subMenu;
    console.log('GlobalState 1:' + subMenuStore.subMenu); // your parameter
    // console.log(event.type); // event type, e.g.: click, etc.
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const hrMenu = () => (
    <>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            HR Management
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(2)(e)}
                  to="/finances/employee"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Employee
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/performance/contract"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  Performance
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button disableRipple component={RouterLink} onClick={closeSidebar} to="/hr/leave" startIcon={<TableChartTwoToneIcon />}>
                  Leave Management
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(3)(e)}
                  to="/finances/salary"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Salary Management
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(10)(e)}
                  to="/finances/pay-slip"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  PaySlip Management
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(9)(e)}
                  to="/finances/pay-point"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  PayPoint Management
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(5)(e)}
                  to="/finances/pension"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Pension Management
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(6)(e)}
                  to="/finances/medical-scheme"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Medical Scheme
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(4)(e)}
                  to="/finances/loan"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Loan Management
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(0)(e)}
                  to="/finances/policies"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Pay Policies
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(0)(e)}
                  to="/finances/grade"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Grade
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={e => handleSubMenu(0)(e)}
                  to="/finances/policies"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Pay Policies
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/finances/project"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Project
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/finances/timesheet-summary"
                  startIcon={<AccountCircleTwoToneIcon />}
                >
                  Timesheet Summary
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </SubMenuWrapper>
      </List>
    </>
  );

  const financeMenu = () => (
    <List
      component="div"
      subheader={
        <ListSubheader component="div" disableSticky>
          HR Accounting
        </ListSubheader>
      }
    >
      <SubMenuWrapper>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/additions"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                Additions
              </Button>
            </ListItem>

            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/deductions"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                Deductions
              </Button>
            </ListItem>

            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/income-tax"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                {' '}
                Tax Management
              </Button>
            </ListItem>
            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/loan-repayment"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                Loan Repayment
              </Button>
            </ListItem>
            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/pay-slip"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                PaySlip
              </Button>
            </ListItem>

            <ListItem>
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/finances/tax-bracket"
                startIcon={<AccountCircleTwoToneIcon />}
              >
                {' '}
                TaxBracket
              </Button>
            </ListItem>
          </List>
        </Collapse>
      </SubMenuWrapper>
    </List>
  );

  const employeeMenu = () => (
    <List
      component="div"
      subheader={
        <ListSubheader component="div" disableSticky>
          Employee Section
        </ListSubheader>
      }
    >
      <SubMenuWrapper>
        <List component="div">
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/finances/loan"
              startIcon={<AccountCircleTwoToneIcon />}
            >
              Loan Applications
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/finances/employee"
              startIcon={<DisplaySettingsTwoToneIcon />}
            >
              Employee Details
            </Button>
          </ListItem>
          <ListItem>
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/finances/dependant"
              startIcon={<AccountCircleTwoToneIcon />}
            >
              Medical Scheme Dependants
            </Button>
          </ListItem>
        </List>
      </SubMenuWrapper>
    </List>
  );

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/overview"
                  startIcon={<DesignServicesTwoToneIcon />}
                >
                  Overview
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Dashboards
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboards/crypto"
                  startIcon={<BrightnessLowTwoToneIcon />}
                >
                  HR
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboards/messenger"
                  startIcon={<MmsTwoToneIcon />}
                >
                  FINANCE
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
        {props.isAuthenticated && props.isHR && hrMenu()}
        {props.isAuthenticated && props.isFinance && financeMenu()}
        {props.isAuthenticated && props.isEmployee && employeeMenu()}

        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Components
            </ListSubheader>
          }
        >
           <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/buttons"
                  startIcon={<BallotTwoToneIcon />}
                >
                  Buttons
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/modals"
                  startIcon={<BeachAccessTwoToneIcon />}
                >
                  Modals
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/accordions"
                  startIcon={<EmojiEventsTwoToneIcon />}
                >
                  Accordions
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tabs"
                  startIcon={<FilterVintageTwoToneIcon />}
                >
                  Tabs
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/badges"
                  startIcon={<HowToVoteTwoToneIcon />}
                >
                  Badges
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/tooltips"
                  startIcon={<LocalPharmacyTwoToneIcon />}
                >
                  Tooltips
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/avatars"
                  startIcon={<RedeemTwoToneIcon />}
                >
                  Avatars
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/cards"
                  startIcon={<SettingsTwoToneIcon />}
                >
                  Cards
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/components/forms"
                  startIcon={<TrafficTwoToneIcon />}
                >
                  Forms
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
