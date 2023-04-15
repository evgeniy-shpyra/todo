import React from "react"
import styles from "./Switch.module.scss"

interface SwitchProps {
    disabled?: boolean
    value?: boolean
    onToggle?: (value: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({
    disabled = false,
    onToggle,
    value,
}) => {
    const toggleSwitch = (e: React.ChangeEvent<any>) => {
        if (onToggle) {
            onToggle(e.target.checked)
        }
    }

    return (
        <label className={styles.switch}>
            <input
                disabled={disabled}
                className={styles.checkbox}
                id='my-switch'
                type='checkbox'
                checked={value}
                onChange={toggleSwitch}
            />

            <span
                className={`${styles.circle} ${
                    value ? styles.circleActive : ""
                }`}
            />
        </label>
    )
}

export default Switch
