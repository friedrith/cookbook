import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import 'regenerator-runtime/runtime'

import store from './store'

// import App from '~/src/components/App'
import reportWebVitals from './reportWebVitals'
import '~/src/utils/services/i18n'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import AuthProvider from '~/src/features/authentication/components/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// eslint-disable-next-line i18next/no-literal-string
const App = () => <div>foo</div>

root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register()
