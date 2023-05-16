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

const loading = <div>loading ...</div>;

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

const GatewayRoutes = React.lazy(() => import('@gateway/entities-routes').catch(() => import('app/shared/error/error-loading')));
const ApprovalRoutes = React.lazy(() => import('@approval/entities-routes').catch(() => import('app/shared/error/error-loading')));
const NotifictionRoutes = React.lazy(() => import('@notifiction/entities-routes').catch(() => import('app/shared/error/error-loading')));
const PerformanceRoutes = React.lazy(() => import('@performance/entities-routes').catch(() => import('app/shared/error/error-loading')));
const FinancesRoutes = React.lazy(() => import('@finances/entities-routes').catch(() => import('app/shared/error/error-loading')));

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />
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
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <GatewayRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="approval/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
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
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <PerformanceRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="finances/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <FinancesRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
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
