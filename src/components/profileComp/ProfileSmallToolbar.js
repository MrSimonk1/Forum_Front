import React from "react"
import {CgProfile} from "react-icons/cg";
import {BsSignpost2} from "react-icons/bs";
import {AiOutlineComment} from "react-icons/ai";
import styles from "./ProfileStyle.module.css";


const ProfileSmallToolbar = ({selected, setSelected}) => {
    return (
        <div className={styles.small_toolbar}>
            <div className={selected === 0 ? `${styles.selected}` : null} 
                 onClick={() => setSelected(0)}>
                <BsSignpost2/>
            </div>
            <div className={selected === 1 ? `${styles.selected}` : null} 
                 onClick={() => setSelected(1)}>
                <AiOutlineComment/>
            </div>
            <div className={selected === 2 ? `${styles.selected}` : null}
                 onClick={() => setSelected(2)}>
                <CgProfile/>
            </div>
        </div>
    )
}

export default ProfileSmallToolbar;