import React from 'react';
//import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useRef, useState } from 'react';

const adminMenuItems = () => (
  <>
    <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/gateway">
      <Translate contentKey="global.menu.admin.gateway">Gateway</Translate>
    </MenuItem>
    <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/metrics">
      <Translate contentKey="global.menu.admin.metrics">Metrics</Translate>
    </MenuItem>
    <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/health">
      <Translate contentKey="global.menu.admin.health">Health</Translate>
    </MenuItem>
    <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/configuration">
      <Translate contentKey="global.menu.admin.configuration">Configuration</Translate>
    </MenuItem>
    <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/logs">
      <Translate contentKey="global.menu.admin.logs">Logs</Translate>
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => (
  <MenuItem sx={{ px: 3 }} component={NavLink} to="/admin/docs">
    <Translate contentKey="global.menu.admin.apidocs">API</Translate>
  </MenuItem>
);

const databaseItem = () => (
  <DropdownItem tag="a" href="http://localhost:8092/" target="_tab">
    <FontAwesomeIcon icon="database" fixedWidth /> <Translate contentKey="global.menu.admin.database">Database</Translate>
  </DropdownItem>
);

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

export const AdminMenu = ({ showOpenAPI, showDatabase }) => {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    // <NavDropdown icon="users-cog" name={translate('global.menu.admin.main')} id="admin-menu" data-cy="adminMenu">
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
          <ListItem classes={{ root: 'MuiListItem-indicators' }} button ref={ref} onClick={handleOpen}>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Admin
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        {adminMenuItems()}
        {showOpenAPI && openAPIItem()}

        {showDatabase && databaseItem()}
      </Menu>
    </>
  );
};

export default AdminMenu;
