import React from 'react';
import { useEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { Box, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import subMenuStore from '../../Sidebar/menuStore';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }

        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};

            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};

                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {

                    background: transparent;

                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

const HeaderMenu = view(() => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [subMenu, setSubMenu] = React.useState(0);

  useEffect(() => {
    setSubMenu(subMenuStore.subMenu);
    console.log('GlobalSate Menu: ' + subMenuStore.subMenu);
  }, []);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const emplist = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/employee">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Employee Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/grade">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Grade Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/Department">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Department Details" />
      </ListItem>
    </>
  );

  const payslipList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/pay-slip/">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Payslip Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/Additions/">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Addition Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/deductions">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Deductions Details" />
      </ListItem>
    </>
  );

  const medicalList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/dependant">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Dependant Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/medical-scheme">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Medical Schemes" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/timesheet-summary">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="TimeSheet Summary" />
      </ListItem>
    </>
  );
  const paypointList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/pay-point">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Paypoint Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/employee-paypoint">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Employee Paypoint" />
      </ListItem>
    </>
  );
  const loansList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/loan">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Loans" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/loan-repayment">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Repayments" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/loan-type">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="LoanTypes" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/loanlimits">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="LoanLimits" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/skip-month">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="SKip Months" />
      </ListItem>
    </>
  );

  const pensionList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/pension">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Pension Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/pension-provider">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Pension Providers" />
      </ListItem>
    </>
  );
  const salaryList = () => (
    <>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/salary">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Salary Details" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/increment">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Salary Increment" />
      </ListItem>
      <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to="/finances/increment-type">
        <ListItemText primaryTypographyProps={{ noWrap: true }} primary="Increment Type" />
      </ListItem>
    </>
  );

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <List disablePadding component={Box} display="flex">
          {subMenuStore.subMenu === 2
            ? emplist()
            : subMenuStore.subMenu === 3
            ? salaryList()
            : subMenuStore.subMenu === 4
            ? loansList()
            : subMenuStore.subMenu === 5
            ? pensionList()
            : subMenuStore.subMenu === 6
            ? medicalList()
            : subMenuStore.subMenu === 9
            ? paypointList()
            : subMenuStore.subMenu === 10
            ? payslipList()
            : payslipList()}
        </List>
      </ListWrapper>
      {subMenuStore.subMenu}
    </>
  );
});

export default HeaderMenu;
