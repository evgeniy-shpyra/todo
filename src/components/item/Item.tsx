import React from "react"
import styles from "./Item.module.scss"
import RowContainer from "../rowContainer/RowContainer"
import Switch from "../customUiElements/switch/Switch"
import Field from "../customUiElements/field/Field"
import { useAppDispatch } from "../../hooks/reduxHooks"
import {
    toggleSelectItem,
    toggleBlockItem,
    changeCompanyIcon,
    onChangeRowValue,
    changeNewElement,
    saveNewElement,
} from "../../redux/features/tableSlice"
import classNames from "classnames"
import { ColumnType } from "../../types/TableType"
import DeleteButton from "./deleteButton/DeleteButton"

const idValidation = (value: string) => {
    if (value.length > 3) return false
    if (Number.isNaN(Number(value))) return false
    return true
}

interface ItemProps {
    staticId: string
    id: number | null
    product: string
    name: string
    isBlocked: boolean
    isOpacity: boolean
    isSelected: boolean
    iconName?: string | null
    isNew?: boolean
}

const Item: React.FC<ItemProps> = ({
    id,
    product,
    name,
    isBlocked,
    isOpacity,
    isSelected,
    staticId,
    iconName,
    isNew = false,
}) => {
    const dispatch = useAppDispatch()

    const [typeOfColumnInFocus, setTypeOfColumnInFocus] =
        React.useState<ColumnType | null>(isNew ? "id" : null)

    const onChangeRowValueHandler = (data: {
        type: ColumnType
        value: string
        rowId: string
    }) => {
        if (isNew) {
            dispatch(
                changeNewElement({
                    type: data.type,
                    value: data.value,
                })
            )
            if (typeOfColumnInFocus === "name") dispatch(saveNewElement())

            setTypeOfColumnInFocus("name")
        } else
            dispatch(
                onChangeRowValue({
                    type: data.type,
                    value: data.value,
                    staticId: data.rowId,
                })
            )
    }

    const toggleIsBlocked = (value: boolean) => {
        !isNew && dispatch(toggleBlockItem({ staticId, value }))
    }

    const onSelectHandler = (e: React.MouseEvent<any>) => {
        if (e.target instanceof HTMLDivElement) {
            dispatch(toggleSelectItem({ staticId }))
        }
    }

    const onChangeIcon = (iconName: string) => {
        dispatch(changeCompanyIcon({ staticId, iconName }))
    }

    const itemStyles = classNames(
        styles.item,
        { [styles.opacity]: isOpacity },
        { [styles.selected]: isSelected }
    )

    return (
        <li className={styles.itemContainer}>
            <RowContainer onClick={onSelectHandler} customStyles={itemStyles}>
                <div>
                    <Switch value={isBlocked} onToggle={toggleIsBlocked} />
                </div>
                <div className={styles.grayText}>
                    <Field
                        rowId={staticId}
                        color={isSelected ? "white" : "gray"}
                        type='product'
                        disabled={!isBlocked}
                        initialValue={product}
                        onChange={onChangeRowValueHandler}
                    />
                </div>
                <div className={styles.grayText}>
                    <Field
                        rowId={staticId}
                        color={isSelected ? "white" : "gray"}
                        type='id'
                        disabled={!isBlocked}
                        validation={idValidation}
                        initialValue={id ? String(id) : ""}
                        onChange={onChangeRowValueHandler}
                        inFocus={typeOfColumnInFocus === "id"}
                    />
                </div>
                <div>
                    <Field
                        rowId={staticId}
                        color={isSelected ? "white" : "gray"}
                        type='name'
                        disabled={!isBlocked}
                        initialValue={name}
                        onChange={onChangeRowValueHandler}
                        iconName={iconName}
                        onChangeIcon={onChangeIcon}
                        isIcon
                        inFocus={typeOfColumnInFocus === "name"}
                    />
                </div>
            </RowContainer>
            <DeleteButton
                isNew={isNew}
                disabled={!isBlocked}
                staticId={staticId}
            />
        </li>
    )
}

export default Item
