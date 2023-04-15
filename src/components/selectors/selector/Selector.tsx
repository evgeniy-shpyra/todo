import React from "react"
import styles from "./Selector.module.scss"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks"
import {
    cancelSelection,
    selectAll,
    toggleSelectItem,
} from "../../../redux/features/itemsSlice"

const Selector: React.FC = () => {
    const dispatch = useAppDispatch()

    const [isActive, setIsActive] = React.useState(false)
    const [isSelectedAllItems, setIsSelectedAllItems] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const { items, selectedItemsId } = useAppSelector((state) => state.items)

    React.useEffect(() => {
        if (items.length === selectedItemsId.length) {
            setIsSelectedAllItems(true)
            setInputValue("")
        } else {
            setIsSelectedAllItems(false)

            const namesOfSelectedValue = selectedItemsId.map((staticId) => {
                const indexOfItem = items.findIndex(
                    (item) => item.staticId === staticId
                )
                return items[indexOfItem].name
            })
            setInputValue(namesOfSelectedValue.join(", "))
        }
    }, [items, selectedItemsId, isActive])

    const onFocusHandler = () => {
        setIsActive(true)
    }
    const onBlurHandler = () => {
        setIsActive(false)
    }

    const onSelectAllItemsHandler = () => {
        dispatch(selectAll())
    }

    const onSelectItemHandler = (staticId: string) => {
        if (isSelectedAllItems) dispatch(cancelSelection())
        dispatch(toggleSelectItem({ staticId }))
    }

    const onChangeInputValueHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputValue(e.target.value)
    }

    const containerStyles = classNames(styles.container, {
        [styles.active]: isActive,
    })

    return (
        <div
            className={containerStyles}
            onMouseOver={onFocusHandler}
            onMouseOut={onBlurHandler}
        >
            <input
                id='name-selector'
                type='text'
                value={inputValue}
                onChange={onChangeInputValueHandler}
                className={styles.input}
            />
            <label className={styles.itemsContainer} htmlFor='name-selector'>
                <ul className={styles.items}>
                    <li
                        onClick={onSelectAllItemsHandler}
                        className={`${styles.item} ${
                            isSelectedAllItems ? styles.selectedItem : ""
                        }`}
                    >
                        Всё
                    </li>
                    {items &&
                        items.map((item) => (
                            <li
                                onClick={() =>
                                    onSelectItemHandler(item.staticId)
                                }
                                key={item.staticId}
                                className={`${styles.item} ${
                                    selectedItemsId.includes(item.staticId) &&
                                    !isSelectedAllItems
                                        ? styles.selectedItem
                                        : ""
                                }`}
                            >
                                {item.name}
                            </li>
                        ))}
                </ul>
            </label>
        </div>
    )
}

export default Selector
