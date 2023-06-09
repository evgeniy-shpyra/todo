import React from "react"
import styles from "./Field.module.scss"
import classnames from "classnames"
import { ColumnType } from "../../../types/TableType"
import SelectingIcons from "../selectingIcons/SelectingIcons"

interface InputProps {
    type: ColumnType
    rowId: string
    disabled?: boolean
    iconName?: string | null
    isIcon?: boolean
    color: "black" | "gray" | "white"
    onFocus?: (value: boolean) => void
    onChangeIcon?: (iconName: string) => void
    onChange?: (data: {
        type: ColumnType
        value: string
        rowId: string
    }) => void
    validation?: (value: string) => boolean
    initialValue: string
    inFocus?: boolean
}

const Input: React.FC<InputProps> = ({
    type,
    rowId,
    color,
    disabled,
    validation,
    initialValue,
    onChange,
    onFocus,
    onChangeIcon,
    iconName,
    isIcon = false,
    inFocus = false,
}) => {
    const [value, setValue] = React.useState(initialValue)
    
    const [isFocus, setIsFocus] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    

    React.useEffect(() => {
        if (inFocus) inputRef.current?.focus()
    }, [inFocus, inputRef])


    React.useEffect(() => {
        if (isFocus === false && initialValue !== value) {
            onChange && onChange({ type, rowId, value })
        }
    }, [isFocus, value])

    const onBlurHandler = () => {
        setIsFocus(false)
        onFocus && onFocus(false)
    }

    const onFocusHandler = (e: React.FocusEvent<any>) => {
        setIsFocus(true)
        onFocus && onFocus(true)
    }

    const onChangeHandler = (e: React.ChangeEvent<any>) => {
        const value = e.target.value
        if (validation) {
            validation(value) && setValue(e.target.value)
        } else setValue(e.target.value)
    }

    const onSelectIconHandler = (name: string) => {
        if (onChangeIcon) onChangeIcon(name)
    }

    const onPressDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onChange && onChange({ type, rowId, value })
            inputRef.current?.blur()
            if (type === "id") {
            }
        }
    }

    const inputStyles = classnames(
        styles.input,
        {
            [styles.blackText]: color === "black",
        },
        {
            [styles.activeInput]: !value || isFocus,
        },
        { [styles.grayText]: color === "gray" },
        { [styles.whiteText]: color === "white" }
    )

    return (
        <div className={styles.container}>
            {iconName && (
                <img
                    className={styles.companyIcon}
                    src={"/companyIcons/" + iconName}
                    alt='logo'
                />
            )}

            <input
                ref={inputRef}
                type='text' 
                value={value}
                disabled={disabled}
                className={inputStyles}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={onChangeHandler}
                onKeyDown={onPressDownHandler}
            />

            {isIcon && (
                <div>
                    <SelectingIcons
                        onSelectIcon={onSelectIconHandler}
                        isVisible={isFocus}
                    />
                </div>
            )}
        </div>
    )
}

export default Input
