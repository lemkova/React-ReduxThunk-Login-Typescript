import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { authLoginApi, AuthState } from '../store/reducers/authSlice'

const Login = () => {
  const authState: AuthState = useSelector((state: any) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(event.target.value)
  }

  const passwordChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const doSubmit = (event : React.SyntheticEvent) => {
    event.preventDefault()
    dispatch(authLoginApi({email, password}))
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <form name="loginForm" onSubmit={doSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={emailChange} value={email} />

        <label>Password:</label>
        <input type="password" name="password" onChange={passwordChange} value={password} />

        <input type="submit" value="Login"/>      
      </form>
      <div>
        {authState.isLoginPending && (<div>Loading...</div>)}
        {authState.isLoginSuccess && (<div>Success.</div>)}
        {authState.errorMessage && (<div>{authState.errorMessage}</div>)}
      </div>
    </div>
  )
}

export default Login