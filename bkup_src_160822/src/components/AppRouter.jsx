import React, { useReducer, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'


import { auth, firestoreDB } from '../utils/firebase.js'

import { doc, query, onSnapshot } from "firebase/firestore"

import { AuthContext } from '../context/AuthContext.js'
import { UserContext } from '../context/UserContext.js'

import authReducer from '../reducers/authReducer.js'
import userReducer from '../reducers/userReducer.js'

import LoginForm from './LoginForm.jsx'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import Comp from './Comp.jsx'
import User from './User.jsx'
import Comp2 from './Comp2.jsx'
import About from './About.jsx'

const AppRouter = () => {

    const ProtectedRoutes = (props) => {

        const { auth } = props
        return auth ? <Outlet /> : <LoginForm />

    }

    const [user, userDispatch] = useReducer(userReducer, {})

    const [userAuth, authDispatch] = useReducer(authReducer, null)

    // const [unSub, setUnSub] = useState()

    // useEffect(() => { // AppRouter useEffect 1

    //     console.log('AppRouter useEffect 1...')

    // }, [])

    useEffect(() => { // Firebase User Watch

        console.log("AppRouter useEffect 1 - should run once [] - Firebase User watch executes Firebase auth().onAuthStateChanged ... ")

        auth.onAuthStateChanged((fbUser) => {

            if (fbUser) {

                console.log("Firebase User Found...", fbUser)
                console.log('Name:', fbUser.displayName + ', Userid:', fbUser.uid + ', Verified:', fbUser.verified)
                authDispatch({ type: 'LOGIN', uid: fbUser.uid })

            }

        })

    }, [])

    useEffect(() => { // get user items 

        // setLoading(true)

        // if (userAuth) {
        if ( (userAuth !== null) && (userAuth.uid !== undefined)) {
            console.log("AppRouter useEffect (2) ... ", userAuth)


            // const unsubscribe = onSnapshot(doc(firestoreDB, "users", userAuth.uid), (doc) => {
            //     console.log("Current data: ", doc.data());
            // });
            // const q = query(doc(firestoreDB, `users/${userAuth.uid}`))
            // const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            const unsubscribe = onSnapshot(doc(firestoreDB, 'users', userAuth.uid), (doc) => {
                console.log("Firestore /user data: ", doc.data())
                userDispatch({ type: 'SET_USER', user: doc.data() })

            })


               

                // return () => {

                //     // Clean up the listener subscription
                //     console.log("Clean up the AppRouter useEffect (2) listener subscription...")
                //     unsubscribe()

                // }
                // return unsubscribe()

            // setUnSub(unsubscribe)
            // unsubscribe()
            return () => {
                console.log("Unsubscribing...")
                unsubscribe()
            }

        }
    }, [userAuth])


    const onLogout = () => {

        console.log("onLogout ...")
        auth.signOut().then(() => {
            userDispatch({ type: 'LOGOUT' })
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
                <UserContext.Provider value={{ user }} >

                    <Routes>

                        <Route>

                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginForm auth={auth} />} />
                            <Route path="*" element={userAuth ? <User /> : <LoginForm />} />
                            <Route element={<ProtectedRoutes auth={userAuth} />} >

                                <Route element={<Layout onLogout={onLogout} />} >
                                    <Route path="user" element={<User user={user} />} />
                                    <Route path="comp1" element={<Comp name='One' />} />
                                    <Route path="comp2" element={<Comp2 />} />
                                    <Route path="about" element={<About />} />
                                </Route>

                            </Route>

                        </Route>

                    </Routes>

                </UserContext.Provider>
            </AuthContext.Provider>

        </BrowserRouter >

    )

}

export { AppRouter as default }