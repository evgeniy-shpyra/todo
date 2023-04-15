import React from "react"
import styles from "./Items.module.scss"
import Item from "../item/Item"
import { useAppSelector } from "../../hooks/reduxHooks"

const Items = () => {
    const { items, selectedItemsId } = useAppSelector((state) => state.table)

    return (
        <ul className={styles.items}>
            {items &&
                items.map((item) => (
                    <Item
                        key={item.staticId}
                        id={item.id}
                        staticId={item.staticId}
                        name={item.name ? item.name : ""}
                        product={item.product}
                        isBlocked={!item.isBlocked}
                        isOpacity={item.isOpacity}
                        isSelected={selectedItemsId.includes(item.staticId)}
                        iconName={item.iconName}
                    />
                ))}
        </ul>
    )
}

export default Items
