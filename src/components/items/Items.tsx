import React from "react"
import styles from "./Items.module.scss"
import Item from "../item/Item"
import { useAppSelector } from "../../hooks/reduxHooks"

const Items = () => {
    const { items, selectedItemsId, idOfOpacityElement, newElement } =
        useAppSelector((state) => state.table)

    return (
        <ul className={styles.items}>
            {newElement && (
                <Item
                    isNew
                    id={newElement.id}
                    staticId={newElement.staticId}
                    name={newElement.name ? newElement.name : ""}
                    product={newElement.product}
                    isBlocked={!newElement.isBlocked}
                    isOpacity={
                        idOfOpacityElement &&
                        idOfOpacityElement === newElement.staticId
                            ? true
                            : false
                    }
                    isSelected={selectedItemsId.includes(newElement.staticId)}
                    iconName={newElement.iconName}
                />
            )}
            {items &&
                items.map((item) => (
                    <Item
                        key={item.staticId}
                        id={item.id}
                        staticId={item.staticId}
                        name={item.name ? item.name : ""}
                        product={item.product}
                        isBlocked={!item.isBlocked}
                        isOpacity={
                            idOfOpacityElement &&
                            idOfOpacityElement === item.staticId
                                ? true
                                : false
                        }
                        isSelected={selectedItemsId.includes(item.staticId)}
                        iconName={item.iconName}
                    />
                ))}
        </ul>
    )
}

export default Items
