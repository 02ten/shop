import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "../index";
import {adminRoutes, authRoutes, publicRoutes} from "../Routes";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth === true && user.user.roles.includes('admin') && adminRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>}/>
            )}
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