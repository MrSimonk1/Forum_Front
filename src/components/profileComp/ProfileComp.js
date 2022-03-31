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
                {selected === 0 ? <MyForumsComp/> : <MyCommentsComp/> }
                <ProfileInfoComp/>
            </div>
        </div>
    );
};

export default ProfileComp;