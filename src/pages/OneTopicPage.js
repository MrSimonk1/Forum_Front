import React from "react";
import OneTopicComp from "../components/oneTopicComp/OneTopicComp";
import styles from "./PagesStyles.module.css";

const OneTopicPage = () => {
    return (
        <div className={styles.bg_and_padding}>
            <OneTopicComp/>
        </div>
    )
}

export default OneTopicPage;