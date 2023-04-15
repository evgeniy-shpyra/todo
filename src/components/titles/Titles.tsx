import React from "react"
import styles from "./Titles.module.scss"
import AddIcon from "../icons/addIcon/AddIcon"
import RowContainer from "../rowContainer/RowContainer"
import { useAppDispatch } from "../../hooks/reduxHooks"
import { addItem, createNewElement } from "../../redux/features/tableSlice"

const Titles: React.FC = () => {
    const dispatch = useAppDispatch()

    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const onAddItemHandler = () => {
        dispatch(createNewElement())
        if (buttonRef) {
            const nextElement = buttonRef.current?.nextElementSibling
            if (nextElement) {
                const nextNextElement: any = nextElement.nextElementSibling
                nextNextElement && nextNextElement.focus()
            }
        }
    }

    return (
        <div className={styles.titlesContainer}>
            <RowContainer customStyles={styles.row}>
                <div className={styles.tableElement}>Статус</div>
                <div className={styles.tableElement}>Товар</div>
                <div className={styles.tableElement}>ID</div>
                <div className={styles.tableElement}>Название</div>
            </RowContainer>

            <button
                ref={buttonRef}
                onClick={onAddItemHandler}
                className={styles.button}
            >
                <AddIcon
                    size='24px'
                    color='rgba(0, 0, 0, 0.65)'
                    hoverColor='rgba(0, 0, 0, 0.8)'
                />
            </button>
        </div>
    )
}

export default Titles
