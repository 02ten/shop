import React, {useContext} from 'react';
import {Context} from "../index";

const Home = () => {
    const {users} = useContext(Context)

    return (
        <div>
            HOME PAGE
        </div>
    );
};

export default Home;