import React from 'react'
import { Link, Outlet } from "react-router-dom"

import NavMenu from './NavMenu.jsx'

const Layout = () => {

    return (

        <div>

            <NavMenu />
            <Outlet />

        </div>

    )

}

export { Layout as default }