import {Space as AntDesignSpaceProvider} from 'antd';
import React, {useEffect} from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
// import 'antd/dist/antd.less';
// import 'antd/dist/antd.dark.less';
import {ThemeProvider} from 'styled-components';
// import AppLoading from './components/AppLoading/AppLoading';
import OverlayLoading from './components/Loading/OverlayLoading';
import NavBar from './components/NavBar/NavBar';
import NavBarProvider from './components/NavBarProvider/NavBarProvider';
import useFetchProfile from './components/Profile/hooks/fetchProfileHook';
// import OrderAnalysisProvider from './components/OrderAnalysisProvider/OrderAnalysisProvider';
// import ProfileContainer from './components/ProfileContainer/ProfileContainer';
import ViewportProvider from './components/WindowViewport/ViewportProvider';
import NAVIGATION_ROUTES from './config/NavigationRoutes';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import JobStatistics from './pages/JobStatistics';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import {lightTheme} from './styles/Theme';

const {
  basePath,
  dashboard,
  statistics,
  forgotPassword,
  login,
  resetPassword,
  signup,
} = NAVIGATION_ROUTES;

const App: React.FC = () => {
  const {loading, data, fetchProfile} = useFetchProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <OverlayLoading />;

  return (
    <NavBarProvider>
      <NavBar isAuthorized={!!data} />
      <Switch>
        {data && <Route {...dashboard} component={Dashboard} />}
        <Route {...statistics} component={JobStatistics} />
        <Redirect to={statistics.path} />
      </Switch>
    </NavBarProvider>
  );
};

const AppWithAuth: React.FC = () => (
  <ThemeProvider theme={{colors: lightTheme}}>
    <ViewportProvider>
      <Router basename={basePath.path}>
        <AntDesignSpaceProvider>
          <Switch>
            <Route {...login} component={Login} />
            <Route {...signup} component={Signup} />
            <Route {...forgotPassword} component={ForgotPassword} />
            <Route
              component={ResetPassword}
              exact={resetPassword.exact}
              path={`${resetPassword.path}${resetPassword.params}`}
            />
            <Route {...statistics} component={App} />
          </Switch>
        </AntDesignSpaceProvider>
      </Router>
    </ViewportProvider>
  </ThemeProvider>
);

export default AppWithAuth;
