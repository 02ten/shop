import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "../index";
import {authRoutes, publicRoutes} from "../Routes";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(window.location.href)
    console.log("here")
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>}/>
            )}
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>}/>
            )}
            <Route
                path="*" element={<Navigate to ="/" replace />}
            />
        </Routes>
    );
};

export default AppRouter;