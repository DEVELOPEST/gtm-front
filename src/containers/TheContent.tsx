import React, { Suspense } from 'react'
import {
  Redirect,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes/routes'
import {AdminRoute, AnyUserRoute, LecturerRoute} from "../Auth";
import {ADMIN, USER} from "../constants";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

const TheContent = () => {

    const getRoute = (route: any, idx: number) => {
        if (route.authority === ADMIN) {
            return <AdminRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={(props: any) => (
                    <CFade>
                        <route.component {...props} />
                    </CFade>
                )} />
        } else if (route.authority === USER) {
            return <AnyUserRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={(props: any) => (
                    <CFade>
                        <route.component {...props} />
                    </CFade>
                )} />
        } else {
            return <LecturerRoute
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={(props: any) => (
                    <CFade>
                        <route.component {...props} />
                    </CFade>
                )} />
        }
    }

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (getRoute(route, idx))
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
