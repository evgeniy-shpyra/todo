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
}) => {
    const [value, setValue] = React.useState(initialValue)
    const [decorationValue, setDecorationValue] = React.useState(initialValue)
    const [isFocus, setIsFocus] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isOverflowed, setIsOverflowed] = React.useState(false)

    React.useEffect(() => {
        if (inputRef.current) {
            const input: HTMLInputElement = inputRef.current

            if (input.scrollWidth > input.clientWidth && !isFocus) {
                setIsOverflowed(true)
                setDecorationValue(
                    value.slice(0, input.clientWidth / 15) + "..."
                )
            } else {
                setIsOverflowed(false)
            }
        }
    }, [value, isFocus])

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
                id={`${rowId}${type}`}
                ref={inputRef}
                type='text'
                value={isOverflowed ? decorationValue : value}
                disabled={disabled}
                className={inputStyles}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                onChange={onChangeHandler}
            />
            {/* {isOverflowed && <span className={ellipsisStyles}>...</span>} */}

            {isIcon && (
                <label htmlFor={`${rowId}${type}`}>
                    <SelectingIcons
                        onSelectIcon={onSelectIconHandler}
                        isVisible={isFocus}
                    />
                </label>
            )}
        </div>
    )
}

export default Input
