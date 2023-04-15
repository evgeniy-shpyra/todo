import React from "react"
import { IconPropsType } from "../../../types/IconType"
import styles from "../Icon.module.scss"

const AddIcon: React.FC<IconPropsType> = ({
    color = "#000",
    hoverColor,
    size = "24px",
    onClick,
}) => {
    return (
        <span
            className={styles.iconContainer}
            style={{ width: size, height: size }}
        >
            <svg
                width='100%'
                height='100%'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M11.6667 14.3333H3.66667C2.2 14.3333 1 13.1333 1 11.6667V3.66666C1 2.2 2.2 1 3.66667 1H11.6667C13.1333 1 14.3333 2.2 14.3333 3.66666V11.6667C14.3333 13.1333 13.1333 14.3333 11.6667 14.3333Z'
                    stroke={color}
                    // stroke-opacity='0.65'
                    strokeWidth='1.2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M7.66649 10.3335V5.0002'
                    stroke={color}
                    // stroke-opacity='0.65'
                    strokeWidth='1.2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M10.3332 7.66704H4.99989'
                    stroke={color}
                    // stroke-opacity='0.65'
                    strokeWidth='1.2'
                    strokeMiterlimit='10'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </span>
    )
}

export default AddIcon
