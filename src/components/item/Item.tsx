import React from "react"
import styles from "./Item.module.scss"
import RowContainer from "../rowContainer/RowContainer"
import Switch from "../switch/Switch"
import Text from "../input/Input"

interface ItemProps {
    id: number
    product: string
    name: string
    stats: boolean
}

const Item: React.FC<ItemProps> = ({ id, product, name, stats }) => {
    return (
        <li className={styles.item}>
            <RowContainer>
                <div>
                    <Switch />
                </div>
                <div className={styles.grayText}>
                    <Text color='gray' type='product' initialValue={product} />
                </div>
                <div className={styles.grayText}>
                    <Text
                        color='gray'
                        type='product'
                        initialValue={String(id)}
                    />
                </div>
                <Text color='black' type='product' initialValue={name} />
            </RowContainer>
        </li>
    )
}

export default Item
