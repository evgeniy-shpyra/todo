import React from "react"
import styles from "./RowContainer.module.scss"

interface RowContainerProps {
    children: React.ReactNode
    customStyles?: string
    onClick?: (e: React.MouseEvent<any>) => void
}

const RowContainer: React.FC<RowContainerProps> = ({
    children,
    customStyles = "",
    onClick,
}) => {
    return (
        <div onClick={onClick} className={`${styles.row} ${customStyles}`}>
            {children}
        </div>
    )
}

export default RowContainer
