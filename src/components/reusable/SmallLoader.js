import React from "react";
import styles from "./ReusableStyle.module.css";

const SmallLoader = () => {
    return (
        <div className={styles.loader_bg}>
            <div className={styles.loader}>

            </div>
        </div>
    )
}

export default SmallLoader;