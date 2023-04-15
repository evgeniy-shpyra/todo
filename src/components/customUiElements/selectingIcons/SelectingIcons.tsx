import React from "react"
import styles from "./SelectingIcons.module.scss"
import classNames from "classnames"
import { useAppSelector } from "../../../hooks/reduxHooks"

interface SelectIconsProps {
    isVisible: boolean
    onSelectIcon: (name: string) => void
}

const SelectingIcons: React.FC<SelectIconsProps> = ({
    isVisible,
    onSelectIcon,
}) => {
    const companyIcons = useAppSelector((state) => state.table.companyIcons)

    const [isHover, setIsHover] = React.useState(false)

    const handleMouseOver = () => {
        setIsHover(true)
    }
    const handleMouseOut = () => {
        setIsHover(false)
    }

    const containerStyles = classNames(styles.containerStyles, {
        [styles.hidden]: !isVisible && !isHover,
    })

    const onSelectIconHandler = (icon: { name: string; isUsed: boolean }) => {
        if (!icon.isUsed) {
            onSelectIcon(icon.name)
        }
    }

    return (
        <div
            className={containerStyles}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <ul className={styles.items}>
                {companyIcons.map((item) => (
                    <li
                        key={item.name}
                        className={styles.item}
                        onClick={() =>
                            onSelectIconHandler({
                                name: item.name,
                                isUsed: item.isUsed,
                            })
                        }
                    >
                        <img
                            className={`${styles.icon} ${
                                item.isUsed ? styles.opacityIcon : ""
                            }`}
                            src={"./companyIcons/" + item.name}
                            alt='icon'
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SelectingIcons
