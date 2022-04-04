import React, {useState} from 'react';
import ProfileInfoComp from "./ProfileInfoComp";
import ProfileToolbarComp from "./ProfileToolbarComp";
import MyForumsComp from "./MyForumsComp";
import MyCommentsComp from "./MyCommentsComp";
import styles from "./ProfileStyle.module.css";
import ProfileSmallToolbar from './ProfileSmallToolbar';

const ProfileComp = () => {

    const [selected, setSelected] = useState(0);

    return (
        <div>
            <div className={styles.xs_d_none}>
                <ProfileToolbarComp selected={selected} setSelected={setSelected}/>
            </div>
            <div>
                <ProfileSmallToolbar selected={selected} setSelected={setSelected}/>
            </div>
            <div className={styles.profile_bg}>
                {selected === 0 &&  <div className={styles.w100}><MyForumsComp/></div> }          
                {selected === 1 && <MyCommentsComp/>}
                <div className={selected === 2 ? `${styles.sm_d}` : `${styles.sm_d_none}`}>
                   <ProfileInfoComp/> 
                </div>
            </div>
        </div>
    );
};

export default ProfileComp;