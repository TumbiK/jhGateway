import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import LoginRedirect from 'app/modules/login/login-redirect';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import SidebarLayout from './shared/layouts/SidebarLayout';
import BaseLayout from './shared/layouts/BaseLayout';
import DashboardCrypto from './shared/content/dashboards/Crypto';
import SuspenseLoader from './shared/components/SuspenseLoader';

const loading = <div>loading ...</div>;

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

const Loader = Component => props =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const GatewayRoutes = React.lazy(() => import('@gateway/entities-routes').catch(() => import('app/shared/error/error-loading')));
const ApprovalRoutes = React.lazy(() => import('@approval/entities-routes').catch(() => import('app/shared/error/error-loading')));
const NotifictionRoutes = React.lazy(() => import('@notifiction/entities-routes').catch(() => import('app/shared/error/error-loading')));
const PerformanceRoutes = React.lazy(() => import('@performance/entities-routes').catch(() => import('app/shared/error/error-loading')));
const FinancesRoutes = React.lazy(() => import('@finances/entities-routes').catch(() => import('app/shared/error/error-loading')));

const Crypto = Loader(React.lazy(() => import('./shared/content/dashboards/Crypto')));

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />

        <Route path="dashboard" element={<SidebarLayout />}>
          <Route path="dash" element={<DashboardCrypto />} />
        </Route>

        <Route path="logout" element={<Logout />} />
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="oauth2/authorization/oidc" element={<LoginRedirect />} />
        <Route
          path="gateway/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute
                hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.HR, AUTHORITIES.USER, AUTHORITIES.FINANCE, AUTHORITIES.EMPLOYEE]}
              >
                <GatewayRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="approval/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
                <ApprovalRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="notifiction/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <NotifictionRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="performance/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.HR, AUTHORITIES.FINANCE, AUTHORITIES.EMPLOYEE]}>
                <PerformanceRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route path="/finances/" element={<SidebarLayout />}>
          <Route
            path="*"
            element={
              <Suspense fallback={loading}>
                <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.HR, AUTHORITIES.FINANCE, AUTHORITIES.EMPLOYEE]}>
                  <FinancesRoutes />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
