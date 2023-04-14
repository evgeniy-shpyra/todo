import React from "react"
import styles from "./Titles.module.scss"
import AddIcon from "../icons/AddIcon"
import RowContainer from "../rowContainer/RowContainer"

const Header = () => {
    return (
        <RowContainer>
            <div className={styles.element}>Статус</div>
            <div className={styles.element}>Товар</div>
            <div className={styles.element}>ID</div>
            <div className={styles.element}>Название</div>
            <div className={styles.element}>
                <AddIcon
                    size='24px'
                    color='rgba(0, 0, 0, 0.65)'
                    hoverColor='rgba(0, 0, 0, 0.8)'
                />
            </div>
        </RowContainer>
    )
}

export default Header
