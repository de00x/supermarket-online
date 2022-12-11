import { ILoginControllersProps } from '../types/types'
import { SyntheticEvent } from 'react'
import axios from 'axios'

const LoginControllers = ({
  userData,
  setDataError,
  setBlockAuthorization,
}: ILoginControllersProps) => {
  const submit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    axios
      .post('/authorize', {
        login: userData.login,
        password: userData.password,
      })
      .then((res) => {
        if (res.data.isLogin === false) {
          setDataError(true)
        } else if (res.data.isLogin === true) {
          setBlockAuthorization(false)
          localStorage.setItem('login', res.data.login)
          localStorage.setItem('id', res.data.id)
          window.location.reload()
        }
      })
      .catch(() => {
        setDataError(true)
      })
  }
  return { submit }
}
export default LoginControllers
