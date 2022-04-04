import React from "react";
import CreateTopicComp from "../components/createTopicComp/CreateTopicComp";
import styles from "./PagesStyles.module.css";

const CreateTopicPage = () => {
    return (
        <div className={styles.bg_and_padding}>
            <CreateTopicComp/>     
        </div>
    )
}

export default CreateTopicPage;