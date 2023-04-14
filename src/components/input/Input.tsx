import React from "react"
import styles from "./Input.module.scss"
import classnames from "classnames"

interface InputProps {
    type: "product" | "id" | "name"
    color: "black" | "gray" | "white"
    initialValue: string
}

const Input: React.FC<InputProps> = ({ type, color, initialValue }) => {
    const [value, setValue] = React.useState(initialValue)
    const [focus, setFocus] = React.useState(false)

   

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        setValue(e.target.value)
    }

    const onBlurHandler = (e: React.ChangeEvent<any>) => {
        setFocus(false)
    }

    const onFocusHandler = (e: React.ChangeEvent<any>) => {
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
