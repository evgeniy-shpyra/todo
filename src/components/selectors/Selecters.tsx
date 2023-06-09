import React from "react"
import styles from "./Selectors.module.scss"

import RowContainer from "../rowContainer/RowContainer"
import DeleteIcon from "../icons/deleteIcon/DeleteIcon"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { cancelSelection } from "../../redux/features/tableSlice"
import SelectingFields from "../customUiElements/selectingFields/SelectingFields"
import classNames from "classnames"

const Selectors: React.FC = () => {
    const dispatch = useAppDispatch()

    const selectedItemsId = useAppSelector(
        (state) => state.table.selectedItemsId
    )

    const onCancelSelectionHandler = () => {
        dispatch(cancelSelection())
    }

    const buttonContainerStyles = classNames(styles.buttonContainer, {
        [styles.hiddenClearButton]: !(selectedItemsId.length > 0),
    })

    return (
        <div className={styles.rowContainer}>
            <RowContainer customStyles={styles.row}>
                <div></div>
                <div></div>
                <div></div>
                <SelectingFields />
            </RowContainer>
            <div className={buttonContainerStyles}>
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
            </div>
        </div>
    )
}

export default Selectors
