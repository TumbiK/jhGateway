import React, { Suspense } from 'react';
import { translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const EntitiesMenuItems = React.lazy(() => import('app/entities/menu').catch(() => import('app/shared/error/error-loading')));
const GatewayEntitiesMenuItems = React.lazy(() => import('@gateway/entities-menu').catch(() => import('app/shared/error/error-loading')));
const ApprovalEntitiesMenuItems = React.lazy(() => import('@approval/entities-menu').catch(() => import('app/shared/error/error-loading')));
const NotifictionEntitiesMenuItems = React.lazy(() =>
  import('@notifiction/entities-menu').catch(() => import('app/shared/error/error-loading'))
);
const PerformanceEntitiesMenuItems = React.lazy(() =>
  import('@performance/entities-menu').catch(() => import('app/shared/error/error-loading'))
);
const FinancesEntitiesMenuItems = React.lazy(() => import('@finances/entities-menu').catch(() => import('app/shared/error/error-loading')));

export const EntitiesMenu = () => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <Suspense fallback={<div>loading...</div>}>
      <EntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <GatewayEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <ApprovalEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <NotifictionEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <PerformanceEntitiesMenuItems />
    </Suspense>
    <Suspense fallback={<div>loading...</div>}>
      <FinancesEntitiesMenuItems />
    </Suspense>
  </NavDropdown>
);
