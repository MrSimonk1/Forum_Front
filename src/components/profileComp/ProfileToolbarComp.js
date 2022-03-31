import React from 'react';
import styles from "./ProfileStyle.module.css";

const ProfileToolbarComp = ({selected, setSelected}) => {

    return (
        <div className={styles.toolbar}>
            <div className={selected === 0 && `${styles.selected}`} onClick={() => setSelected(0)}>My posts</div>
            <div className={selected === 1 && `${styles.selected}`} onClick={() => setSelected(1)}>My comments</div>
        </div>
    );
};

export default ProfileToolbarComp;