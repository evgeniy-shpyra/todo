import React from "react"
import styles from "./RowContainer.module.scss"

interface RowContainerProps {
    children: React.ReactNode
}

const RowContainer: React.FC<RowContainerProps> = ({ children }) => {
    return <div className={styles.row}>{children}</div>
}

export default RowContainer
