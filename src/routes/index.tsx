import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from '../pages/auth/login';
import { SignupPage } from '../pages/auth/signup';
import { ForgotPasswordPage } from '../pages/auth/forgot-password';
import { Index } from '../pages/dashboard';

// Lazy-loaded dashboard pages
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Cameras = React.lazy(() => import('../pages/cameras'));
const EventSummaries = React.lazy(() => import('../pages/event-summaries'));
const Settings = React.lazy(() => import('../pages/settings'));
const LiveStream = React.lazy(() => import('../pages/live-stream'));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        
        <Route path="/app">
          <Dashboard>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/app/dashboard" component={Dashboard} />
                <Route exact path="/app/cameras" component={Cameras} />
                <Route exact path="/app/cameras/:id" component={LiveStream} />
                <Route exact path="/app/events" component={EventSummaries} />
                <Route exact path="/app/settings" component={Settings} />
                <Redirect from="/app" to="/app/dashboard" />
              </Switch>
            </React.Suspense>
          </Dashboard>
        </Route>
        
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};