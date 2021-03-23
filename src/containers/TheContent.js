import React, { Suspense } from 'react'
import {
  Redirect,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes/routes'
import adminRoutes from '../routes/adminRoutes'
import {AdminRoute, AnyUserRoute} from "../Auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <AnyUserRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
              {adminRoutes.map((route, idx) => {
                  return route.component && (
                      <AdminRoute
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          component={props => (
                              <CFade>
                                  <route.component {...props} />
                              </CFade>
                          )} />
                  )
              })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
