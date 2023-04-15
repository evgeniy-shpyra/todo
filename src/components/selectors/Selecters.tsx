import React from "react"
import styles from "./Selectors.module.scss"

import RowContainer from "../rowContainer/RowContainer"
import DeleteIcon from "../icons/deleteIcon/DeleteIcon"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { cancelSelection } from "../../redux/features/itemsSlice"
import Selector from "./selector/Selector"

const Selectors: React.FC = () => {
    const dispatch = useAppDispatch()

    const selectedItemsId = useAppSelector(
        (state) => state.items.selectedItemsId
    )

    const onCancelSelectionHandler = () => {
        dispatch(cancelSelection())
    }

    return (
        <div className={styles.rowContainer}>
            <RowContainer customStyles={styles.row}>
                <Selector />
                <Selector />
                <Selector />
                <Selector />
            </RowContainer>
            <div className={styles.buttonContainer}>
                {selectedItemsId.length > 0 && (
                    <button
                        onClick={onCancelSelectionHandler}
                        className={styles.cancelSelectionButton}
                    >
                        <DeleteIcon
                            size='24px'
                            color='rgba(0, 0, 0, 0.65)'
                            hoverColor='rgba(0, 0, 0, 0.8)'
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Selectors
