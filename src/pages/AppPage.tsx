import React from "react"
import styles from "./App.module.scss"
import Titles from "../components/titles/Titles"
import RowContainer from "../components/rowContainer/RowContainer"
import Switch from "../components/customUiElements/switch/Switch"
import Items from "../components/items/Items"
import Selectors from "../components/selectors/Selecters"

function App() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.table}>
                    <Titles />
                    <Selectors />
                    <Items />
                </div>
            </div>
        </div>
    )
}

export default App
