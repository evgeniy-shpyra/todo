import React from "react"
import styles from "./Selector.module.scss"
import classNames from "classnames"

const Selector: React.FC = () => {
    const [isActive, setIsActive] = React.useState(false)

    const containerStyles = classNames(styles.container, {
        [styles.active]: isActive,
    })

    const onFocusHandler = () => {
        setIsActive(true)
    }

    const onBlurHandler = () => {
        setIsActive(false)
    }

    return (
        <div className={containerStyles}>
            <input
                type='text'
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                className={styles.input}
            />
        </div>
    )
}

export default Selector
