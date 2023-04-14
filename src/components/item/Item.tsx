import React from "react"
import styles from "./Item.module.scss"
import RowContainer from "../rowContainer/RowContainer"
import Switch from "../switch/Switch"
import Input from "../input/Input"

const idValidation = (value: string) => {
    if (value.length > 3) return false
    if (Number.isNaN(Number(value))) return false
    return true
}

interface ItemProps {
    id: number
    product: string
    name: string
    stats: boolean
}

const Item: React.FC<ItemProps> = ({ id, product, name, stats }) => {
    const onChangeRowDataHandler = (data: {
        type: "product" | "id" | "name"
        value: string
        rowId: number
    }) => {
        console.log(data)
    }

    return (
        <li className={styles.item}>
            <RowContainer>
                <div>
                    <Switch />
                </div>
                <div className={styles.grayText}>
                    <Input
                        rowId={id}
                        color='gray'
                        type='product'
                        initialValue={product}
                        onChange={onChangeRowDataHandler}
                    />
                </div>
                <div className={styles.grayText}>
                    <Input
                        rowId={id}
                        color='gray'
                        type='id'
                        validation={idValidation}
                        initialValue={String(id)}
                        onChange={onChangeRowDataHandler}
                    />
                </div>
                <Input
                    rowId={id}
                    color='black'
                    type='name'
                    initialValue={name}
                    onChange={onChangeRowDataHandler}
                />
            </RowContainer>
        </li>
    )
}

export default Item
