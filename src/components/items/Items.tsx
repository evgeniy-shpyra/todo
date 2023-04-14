import React from "react"
import styles from "./Items.module.scss"
import Item from "../item/Item"

const data = [
    { id: 1, status: true, product: "", name: "Синий" },
    { id: 2, status: true, product: "XXXX-", name: "Синий" },
    { id: 3, status: true, product: "XXXX-", name: "Синий" },
    { id: 4, status: true, product: "XXXX-", name: "Синий" },
    { id: 5, status: true, product: "XXXX-", name: "Синий" },
    { id: 6, status: true, product: "XXXX-", name: "Синий" },
    { id: 7, status: true, product: "XXXX-", name: "Синий" },
]

const Items = () => {
    return (
        <ul className={styles.items}>
            {data &&
                data.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        product={item.product}
                        stats={item.status}
                    />
                ))}
        </ul>
    )
}

export default Items
