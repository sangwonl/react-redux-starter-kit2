import React from 'react'
import ReactDOM from 'react-dom'
import RedBox from 'redbox-react'
import createStore from './store/createStore'
import createRoute from './routes'
import AppContainer from './containers/AppContainer'

// Store Instantiation
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// Render Setup
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = createRoute(store)
  ReactDOM.render(<AppContainer store={store} routes={routes} />, MOUNT_NODE)
}

// Developer Tools Setup
if (__DEV__) {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    window.__REDUX_DEVTOOLS_EXTENSION__.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Go!
render()
