import { IAWControllersProps } from '../types/Awindow.types'
import axios, { AxiosResponse } from 'axios'

const AWControllers = ({
  authorizationData,
  setAccountNotExist,
  setAccountDataIsCorrected,
}: IAWControllersProps) => {
  const onCLickAccountExists = (res: AxiosResponse): void => {
    if (res.data.isLogin === false) {
      onCLickAccountNotExist()
    } else if (res.data.isLogin === true) {
      localStorage.setItem('login', res.data.login)
      localStorage.setItem('id', res.data.id)
      window.location.reload()
    }
  }
  const onCLickAccountNotExist = (): void => {
    setAccountNotExist(true)
    setTimeout(() => {
      setAccountNotExist(false)
    }, 7000)
  }
  const onSubmitLogin = (): void => {
    if (authorizationData.login.length < 4 || authorizationData.password.length < 4) {
      setAccountDataIsCorrected(true)
      setTimeout(() => {
        setAccountDataIsCorrected(false)
      }, 7000)
    } else {
      axios
        .post('/authorize', {
          login: authorizationData.login,
          password: authorizationData.password,
        })
        .then((res) => onCLickAccountExists(res))
        .catch(() => onCLickAccountNotExist)
    }
  }
  return { onSubmitLogin }
}
export default AWControllers
