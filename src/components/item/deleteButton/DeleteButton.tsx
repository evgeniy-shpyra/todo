import React from "react"
import styles from "./DeleteButton.module.scss"
import { useAppDispatch } from "../../../hooks/reduxHooks"
import {
    deleteItem,
    toggleOpacityItem,
} from "../../../redux/features/tableSlice"
import classNames from "classnames"

interface DeleteButtonProps {
    disabled: boolean
    staticId: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ disabled, staticId }) => {
    const dispatch = useAppDispatch()

    const [isVisibleInfoBlock, setIsVisibleInfoBlock] = React.useState(false)

    const onHoverButtonHandler = () => {
        dispatch(toggleOpacityItem({ staticId, value: true }))
        setIsVisibleInfoBlock(true)
    }

    const onBlurButtonHandler = () => {
        dispatch(toggleOpacityItem({ staticId, value: false }))
        setIsVisibleInfoBlock(false)
    }

    const onDeleteHandler = () => {
        dispatch(deleteItem({ staticId }))
    }

    const infoBlockStyles = classNames(styles.infoContainer, {
        [styles.hiddenInfo]: !isVisibleInfoBlock,
    })

    return (
        <div className={styles.buttonContainer}>
            <button
                disabled={disabled}
                className={styles.button}
                onClick={onDeleteHandler}
                onMouseOver={onHoverButtonHandler}
                onMouseOut={onBlurButtonHandler}
            >
                X
            </button>
            <div className={infoBlockStyles}>Удалить елмент</div>
        </div>
    )
}

export default DeleteButton
