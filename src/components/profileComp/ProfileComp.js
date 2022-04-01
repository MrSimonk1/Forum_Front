import React, {useState} from 'react';
import ProfileInfoComp from "./ProfileInfoComp";
import ProfileToolbarComp from "./ProfileToolbarComp";
import MyForumsComp from "./MyForumsComp";
import MyCommentsComp from "./MyCommentsComp";
import styles from "./ProfileStyle.module.css";

const ProfileComp = () => {

    const [selected, setSelected] = useState(0);

    return (
        <div>
            <ProfileToolbarComp selected={selected} setSelected={setSelected}/>
            <div className={styles.profile_bg}>
                {selected === 0 && <MyForumsComp/>}
                {selected === 1 && <MyCommentsComp/>}
                <div className={selected === 2 ? `${styles.sm_d}` : `${styles.sm_d_none}`}>
                   <ProfileInfoComp/> 
                </div>
            </div>
        </div>
    );
};

export default ProfileComp;