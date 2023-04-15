import React from "react"
import styles from "./SelectingFields.module.scss"
import classNames from "classnames"
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks"
import {
    cancelSelection,
    selectAll,
    toggleSelectItem,
} from "../../../redux/features/tableSlice"
import { IItem } from "../../../types/TableType"

const SelectingFields: React.FC = () => {
    const dispatch = useAppDispatch()

    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = React.useState(false)

    const [filteredItems, setFilteredItems] = React.useState<IItem[] | null>(
        null
    )
    const [isSelectedAllItems, setIsSelectedAllItems] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")

    const { items, selectedItemsId } = useAppSelector((state) => state.table)

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
                if (indexOfItem >= 0) return items[indexOfItem].name
            })
            setInputValue(namesOfSelectedValue.join(", "))
        }
    }, [items, selectedItemsId, isActive])

    const onFocusHandler = () => {
        setIsActive(true)
        inputRef.current && inputRef.current.focus()
    }
    const onBlurHandler = () => {
        setIsActive(false)
        setFilteredItems(null)
        inputRef.current && inputRef.current.blur()
    }

    const handelClickOnWindow = (e: any) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(containerRef.current)) onBlurHandler()
    }

    React.useEffect(() => {
        document.addEventListener("click", handelClickOnWindow)
        return () => {
            document.removeEventListener("click", handelClickOnWindow)
        }
    }, [])

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
        const value = e.target.value

        setFilteredItems([])

        setInputValue(value)

        setFilteredItems(
            items.filter((item) => {
                const valueInArray = value.split(",")

                let isCoincides = false
                valueInArray.forEach((inputItem) => {
                    if (
                        inputItem != "" &&
                        item.name &&
                        item.name
                            .toLocaleLowerCase()
                            .indexOf(inputItem.toLocaleLowerCase()) >= 0
                    ) {
                        isCoincides = true
                    }
                })

                return isCoincides
            })
        )
    }

    const containerStyles = classNames(styles.container, {
        [styles.active]: isActive,
    })

    return (
        <div
            ref={containerRef}
            className={containerStyles}
            onMouseOver={onFocusHandler}
        >
            <input
                ref={inputRef}
                id='name-selector'
                type='text'
                value={inputValue}
                onChange={onChangeInputValueHandler}
                className={styles.input}
                autoComplete='off'
            />
            <label className={styles.itemsContainer} htmlFor='name-selector'>
                <ul className={styles.items}>
                    {!filteredItems && (
                        <li
                            onClick={onSelectAllItemsHandler}
                            className={`${styles.item} ${
                                isSelectedAllItems ? styles.selectedItem : ""
                            }`}
                        >
                            Всё
                        </li>
                    )}
                    {filteredItems
                        ? filteredItems.map((item) => (
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
                          ))
                        : items.map((item) => (
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

export default SelectingFields
