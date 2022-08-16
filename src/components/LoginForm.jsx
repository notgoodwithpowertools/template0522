import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { auth } from '../utils/firebase.js'
import { signInWithEmailAndPassword } from "firebase/auth";


// import { AuthContext } from '../context/AuthContext.js'
// import { setLocalStorage } from '../utils/localStorage.js'

import '../css/LoginForm.css'
import '../css/threeCol.css'

import MatInput from './MatInput.jsx'
import MatButton from './MatButton.jsx'

const LoginForm = ({auth}) => {

//   const auth = getAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState('false')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

//   const { authDispatch } = useContext(AuthContext)

  const isEmailValid = (emailTxt) => {
    return !!emailTxt.match(/.+@.+/);
  }

  const updateEmail = (emailTxt) => {
    setEmail(emailTxt)
    setValidEmail(isEmailValid(emailTxt))
  }

  const onLoginEmail = (e) => {

    e.preventDefault()
    console.log("<LoginForm> OnLoginEmail... email:", email + ' , password:', password /* + ' orgID', orgID */)

    signInWithEmailAndPassword(auth, email, password).then((result) => {

      console.log("Auth worked...", result )
      //   authDispatch({ type: 'LOGIN', uid: result.uid })
      //   setLocalStorage('loginType', 'email')
      console.log("location:", location)
      if ( location.state?.from ) {
          navigate(location.state.from)
      }
      else {
          navigate("/user", { replace: true })
      }

      return result

    }, (error) => {

      console.log("Auth error:", error)
      setMessage(error.message)

    })

  }

  const disableButton = () => {
    return (validEmail && (password !== "") ) ? false : true
  }

  return (
    <div className="threeCol">
      <div className='side'></div>
      <div className="middle loginFormMain">
        <p className="loginFormItem">Login</p>
        <MatInput value={email} onChange={updateEmail} onFocus={setMessage} type={"email"} label={"Email"} required />
        <MatInput value={password} onChange={setPassword} onFocus={setMessage} type={"password"} label={"Password"} required />
        <MatButton text={"Login"} onClick={onLoginEmail} disabled={disableButton()} />
        <div className="loginFormItem">
          <Link className="lpLink" to='/register'>Register</Link>
        </div>
        <div className="loginFormItem message">
          {message}
        </div>
      </div>
      
      <div className='side'></div>
      
    </div>
  )

}

export { LoginForm as default }

