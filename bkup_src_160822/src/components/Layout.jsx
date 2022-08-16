import React from 'react'
import { Outlet } from "react-router-dom"

import NavMenu from './NavMenu.jsx'

const Layout = ({onLogout}) => {

    return (

        <div>

            <NavMenu onLogout={onLogout}/>
            <Outlet />

        </div>

    )

}

export { Layout as default }