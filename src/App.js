import React, {Component} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import {AnyUserRoute, NonUserRoute} from "./Auth";

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
        <HashRouter>
            <React.Suspense fallback={loading}>
            <Switch>
              <NonUserRoute exact path="/login" name="Login Page" component={props => <Login {...props}/>}  />
              <NonUserRoute exact path="/register" name="Register Page" component={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" component={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" component={props => <Page500 {...props}/>} />
              <AnyUserRoute path="/" name="Home" component={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
        </HashRouter>
    );
  }
}

export default App;
