import React from "react"
import styles from "./Input.module.scss"
import classnames from "classnames"

interface InputProps {
    type: "product" | "id" | "name"
    rowId: number
    color: "black" | "gray" | "white"
    onChange?: (data: {
        type: "product" | "id" | "name"
        value: string
        rowId: number
    }) => void
    validation?: (value: string) => boolean
    initialValue: string
}

const Input: React.FC<InputProps> = ({
    type,
    rowId,
    color,
    validation,
    initialValue,
    onChange,
}) => {
    const [value, setValue] = React.useState(initialValue)
    const [focus, setFocus] = React.useState(false)

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        if (validation) {
            validation(value) && setValue(e.target.value)
        } else setValue(e.target.value)
    }

    React.useEffect(() => {
        if (focus === false && initialValue !== value) {
            onChange && onChange({ type, rowId, value })
        }
    }, [focus, value])

    const onBlurHandler = () => {
        setFocus(false)
    }

    const onFocusHandler = () => {
        setFocus(true)
    }

    const inputStyles = classnames(
        styles.input,
        {
            [styles.blackText]: color === "black",
        },
        {
            [styles.activeInput]: !value || focus,
        },
        { [styles.grayText]: color === "gray" },
        { [styles.whiteText]: color === "white" }
    )

    return (
        <input
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            type='text'
            value={value}
            onChange={onChangeHandler}
            className={inputStyles}
        />
    )
}

export default Input
