import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'


import { auth } from '../utils/firebase.js'

import { AuthContext } from '../context/AuthContext.js'
// import { UserContext } from '../context/UserContext.js'

import authReducer from '../reducers/authReducer.js'
// import userReducer from '../reducers/userReducer.js'

import LoginForm from './LoginForm.jsx'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Comp from './Comp.jsx'
import User from './User.jsx'
import Comp2 from './Comp2.jsx'
import About from './About.jsx'
// import NoMatch from './NoMatch.jsx'

// const useAuth = () => {

//     const user = { loggedIn: true} 
//     return user && user.loggedIn

// }
// const PublicRoutes = () => {

//     // const auth=useAuth()
//     // const auth = true
//     const isAuth = useAuth()

//     return isAuth ? <Navigate to="/login" /> : <Outlet />

// }

const ProtectedRoutes = (props) => {

    const { auth } = props
    const location = useLocation()

    // const auth=useAuth()
    // const auth = true
    // const isAuth = useAuth()

    // return isAuth ? <Outlet /> : <Navigate to="/login" />
    return auth ? <Outlet /> : <LoginForm />
    // return auth ? <Outlet /> : ( <Navigate to='/user' replace state={{ from: location }} />)
    // return auth ? <Outlet /> : ( <Navigate to='/user' />)

}

const AppRouter = () => {

    // const [user, userDispatch] = useReducer(userReducer, {})
    
    const [userAuth, authDispatch] = useReducer(authReducer, null)

    // const user = {
    //     name: 'Wally'
    // }

    // const isAuth = useAuth()

    useEffect(() => { // AppRouter useEffect 1

        console.log('AppRouter useEffect 1...')

    }, [])

    useEffect(() => { // Firebase User Watch

        console.log("AppRouter useEffect 2 - should run once [] - Firebase User watch executes Firebase auth().onAuthStateChanged ... ")

        auth.onAuthStateChanged((fbUser) => {

            if (fbUser) {

                console.log("Firebase User Found...", fbUser)
                console.log('Name:', fbUser.displayName + ', Userid:', fbUser.uid + ', Verified:', fbUser.verified)
                authDispatch({ type: 'LOGIN', uid: fbUser.uid })

            }

        })

    }, [])

    const onLogout = () => {

        console.log("onLogout ...")
        auth.signOut().then(() => {
            // userDispatch({ type: 'LOGOUT' })
            authDispatch({ type: 'LOGOUT' })
            // orgDispatch({ type: 'LOGOUT' })

        }).then(console.log("Logged out of Firebase..."))
            .catch(function (error) {
                console.log("Logout of Firebase Error has occurred:", error)
            })

    }

    return (

        <BrowserRouter>
            <AuthContext.Provider value={{ userAuth, authDispatch }} >
                {/* <UserContext.Provider value={{ user }} > */}

                    <Routes>
                    
                        <Route>

                            <Route path="/" element={<Home /> } />
                            <Route path="/login" element={<LoginForm /> } />
                            <Route path="*" element={userAuth ? <User /> : <LoginForm /> }  />
                            <Route element={<ProtectedRoutes auth={userAuth} />} >
                        
                                <Route element={<Layout onLogout={onLogout} />} >
                                    <Route path="/user" element={<User /* user={user}  *//>} />
                                    <Route path="comp1" element={<Comp name='One' />} />                         
                                    <Route path="comp2" element={<Comp2 />} />
                                    <Route path="about" element={<About />} />
                                </Route>

                            </Route>
                    
                        </Route>
                
                    </Routes>

                {/* </UserContext.Provider> */}
            </AuthContext.Provider>

        </BrowserRouter >

    )

}

export { AppRouter as default }


// {/** Protected Routes - Wrap all Route under ProtectedRoutes element */}
// <Route path="/" element={<ProtectedRoutes />}>
//                     <Route path="/" element={<Layout />} >
//                         <Route index element={<Home />} />
//                         <Route path="user" element={<User user={user} />} />
//                         <Route path="comp1" element={<Comp name='One' />} />
//                         <Route path="comp2" element={<Comp2 />} />
//                         <Route path="about" element={<About />} />
//                         <Route path="*" element={<NoMatch />} />
//                     </Route>
//                 </Route>
                
//                 {/** Public Routes - Wrap all Route under PublicRoutes element */}
//                 <Route path="login" element={<PublicRoutes />}>
//                     <Route path="/login" element={<Login />} />
//                     {/* <Route path="*" element={<NoMatch />} /> */}
//                 </Route>

//             </Routes>