import React from 'react';
import styles from "./ProfileStyle.module.css";


const ProfileToolbarComp = ({selected, setSelected}) => {

    return (
        <div className={styles.toolbar}>
            <div className={selected === 0 && `${styles.selected}`} onClick={() => setSelected(0)}>My posts</div>
            <div className={selected === 1 && `${styles.selected}`} onClick={() => setSelected(1)}>My comments</div>
            <div className={selected === 2 ? `${styles.selected}` : `${styles.m_d_none} ${styles.xs_d_none}`} 
                 onClick={() => setSelected(2)}>
                My profile
            </div>          
        </div>
    );
};

export default ProfileToolbarComp;