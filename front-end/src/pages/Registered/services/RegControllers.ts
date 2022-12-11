import { IRegControllersProps } from '../types/Registered.types'
import { useNavigate } from 'react-router-dom'
import { SyntheticEvent } from 'react'
import axios from 'axios'

const RegControllers = ({
  userData,
  setRegisterError,
  setIncorrectInputData,
}: IRegControllersProps) => {
  const navigate = useNavigate()

  const submit = (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (userData.login.length > 4 && userData.password.length > 4) {
      axios
        .post('/registration', {
          login: userData.login,
          password: userData.password,
        })
        .then((res) => {
          if (res.data.success === true) {
            setTimeout(() => {
              navigate('/main')
            }, 100)
          } else setRegisterError(true)
          setTimeout(() => {
            setRegisterError(false)
          }, 10000)
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else funcIncorrectData()
  }
  const funcIncorrectData = (): void => {
    setIncorrectInputData(true)
    setTimeout(() => {
      setIncorrectInputData(false)
    }, 7000)
  }
  return { submit }
}
export default RegControllers
