import React, {Component} from 'react';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import {AnyUserRoute, NonUserRoute} from "./Auth";
import { CookiesProvider, Cookies } from "react-cookie";

const isBrowser = () => typeof window !== "undefined";

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
    static getCookies(ctx) {
        if (ctx && ctx.req && ctx.req.headers.cookie) {
            return new Cookies(ctx.req.headers.cookie);
        }

        return new Cookies();
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const cookies = this.getCookies(ctx);

        return { pageProps, cookies };
    }
  render() {
      const { Component, pageProps, cookies } = this.props;

    return (
        <CookiesProvider cookies={isBrowser() ? undefined : cookies}>
            <BrowserRouter basename="/services/gtm/front">
                <React.Suspense fallback={loading}>
                <Switch>
                  <NonUserRoute exact path="/login" name="Login Page" component={props => <Login {...props}/>}  />
                  <NonUserRoute exact path="/register" name="Register Page" component={props => <Register {...props}/>} />
                  <Route exact path="/404" name="Page 404" component={props => <Page404 {...props}/>} />
                  <Route exact path="/500" name="Page 500" component={props => <Page500 {...props}/>} />
                  <AnyUserRoute path="/" name="Home" component={props => <TheLayout {...props}/>} />
                </Switch>
              </React.Suspense>
            </BrowserRouter>
        </CookiesProvider>
    );
  }
}

export default App;
