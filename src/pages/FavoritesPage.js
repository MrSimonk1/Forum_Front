import React from "react";
import styles from "./PagesStyles.module.css";
import FavoritesComp from "../components/favoritesComp/FavoritesComp";

const FavoritesPage = () => {
    return (
        <div className={styles.bg_and_padding}>
            <FavoritesComp/>
        </div>
    )
}

export default FavoritesPage;