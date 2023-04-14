import React from "react"
import styles from "./Switch.module.scss"

interface SwitchProps {
    disabled?: boolean
    initial?: boolean
    onChange?: (state: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({
    disabled = false,
    onChange,
    initial = false,
}) => {
    const [isEnabled, setIsEnabled] = React.useState(initial)

    const toggleSwitch = () => {
        setIsEnabled((prev) => !prev)
        if (onChange) onChange(isEnabled)
    }

    return (
        <label className={styles.switch}>
            <input
                disabled={disabled}
                className={styles.checkbox}
                id='my-switch'
                type='checkbox'
                checked={isEnabled}
                onChange={toggleSwitch}
            />

            <span
                className={`${styles.circle} ${
                    isEnabled ? styles.circleActive : ""
                }`}
            />
        </label>
    )
}

export default Switch
