import React, { useEffect, useState } from 'react';
import styles from "./ProfileStyle.module.css";
import AllTopicsComp from '../allTopicsComp/AllTopicsComp';

const MyForumsComp = () => {

    return (
        <div>
            <AllTopicsComp url="getTopicsOfOneUser"/>
        </div>
    );
};

export default MyForumsComp;