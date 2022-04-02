import React from "react";
import AllTopicsComp from "../components/allTopicsComp/AllTopicsComp";
import styles from "./PagesStyles.module.css";

const AllTopicsPage = () => {
    return (
        <div className={styles.bg_and_padding}>
            <AllTopicsComp url="getTopics"/>
        </div>
    )
}

export default AllTopicsPage;