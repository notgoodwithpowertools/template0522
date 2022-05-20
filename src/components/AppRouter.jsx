import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Comp1 from './Comp1.jsx'
import Comp2 from './Comp2.jsx'
import About from './About.jsx'
import NoMatch from './NoMatch.jsx'


const AppRouter = () => {

    useEffect(() => { // AppRouter useEffect 1

        console.log('AppRouter useEffect 1...')

    }, [])

    return (

        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="comp1" element={<Comp1 />} />
                    <Route path="comp2" element={<Comp2 />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>

        </BrowserRouter>

    )

}

export { AppRouter as default }