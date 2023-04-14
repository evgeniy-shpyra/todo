import React from "react"
import styles from "./App.module.scss"
import Titles from "../components/titles/Titles"
import RowContainer from "../components/rowContainer/RowContainer"
import Switch from "../components/switch/Switch"
import Items from "../components/items/Items"

function App() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Titles />
                <Items />
            </div>
        </div>
    )
}

export default App
