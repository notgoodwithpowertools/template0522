import React from 'react'
import { Link, Outlet } from "react-router-dom"

import NavMenu from './NavMenu.jsx'

const Layout = () => {

    return (

        <div>

            {/* <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/comp1">Comp1</Link>
                    </li>
                    <li>
                        <Link to="/comp2">Comp2</Link>
                    </li>
                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav> */}

            <NavMenu />

            <Outlet />

        </div>

    )

}

export { Layout as default }