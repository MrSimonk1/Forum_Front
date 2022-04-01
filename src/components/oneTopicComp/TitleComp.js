import React from "react";
import styles from "./OneTopicStyle.module.css";

const TitleComp = ({title}) => {
    return (
        <div className={styles.title}>
            {title}
        </div>
    )
}

export default TitleComp;