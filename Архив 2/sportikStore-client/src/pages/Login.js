import React, { useRef, useState } from 'react'
import './login.css'
import { register, login } from '../requests/axios_controller'

function Login() {

  const [isRegister, setIsRegister] = useState(true)
  const email = useRef('')
  const password = useRef('')
  const repeatPassword = useRef('')

  async function reg (email, password, repeatPassword) { 
    console.log(email.current.value)
    console.log(password.current.value)
    console.log(repeatPassword.current.value)
    if(repeatPassword.current.value === password.current.value && password.current.value !== '' && email.current.value !== '') {
      await register(email.current.value, password.current.value).then((res) => {
        alert('Вы успешно зарегистрировались')
      }).catch((error) => {
        alert(error)
      })
      return
    }
    alert('Пароли должны совпадать и не должно быть пустых полей')
  }

  async function auth (email, password) { 
    console.log(email.current.value)
    console.log(password.current.value)
    if(password.current.value !== '' && email.current.value !== '') {
      await login(email.current.value, password.current.value).then((res) => {
        alert('Вы успешно вошли в аккаунт и можете использовать корзину')
        console.log(res)
      }).catch((error) => {
        alert(error)
      })
      return
    }
    alert('Вы не ввели логин или пароль')
  }

  return (
    <>
    {isRegister 
    ?
    <div className='login'>
      <input placeholder='E-mail' ref={email}></input>
      <input placeholder='Пароль' ref={password}></input>
      <input placeholder='Повторите пароль' ref={repeatPassword}></input>
      <button id='btn_login' onClick={() => reg(email, password, repeatPassword)}>Создать аккаунт</button>
      <button id='btn_change' onClick={() => setIsRegister(() => !isRegister)}>У меня уже есть аккаунт</button>
    </div> 
    :
     <div className='login'>
      <input placeholder='E-mail' ref={email}></input>
      <input placeholder='Пароль' ref={password}></input>
      <button id='btn_login' onClick={() => auth(email, password)}>Войти</button>
      <button id='btn_change' onClick={() => setIsRegister(() => !isRegister)}>У меня нет аккаунта</button>
    </div>}

    </>

  )
}

export default Login