import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import AppPage from "./pages/AppPage"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppPage />
        </Provider>
    </React.StrictMode>
)

reportWebVitals()
