import { IAuthorizationData } from './types'
import axios, { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import styles from './styles.module.scss'

export const AuthorizationWindow: FC = (): JSX.Element => {
  const [accountDataIsCorrected, setAccountDataIsCorrected] = useState(false)
  const [accountNotExist, setAccountNotExist] = useState(false)
  const [authorizationData, setAuthorizationData] = useState<IAuthorizationData>({
    login: '',
    password: '',
  })

  /// onClick ///
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
  /// onClick ///

  return (
    <div className={styles.authorizationContainer}>
      <div className={styles.authorizationHeader}>Авторизация</div>
      <input
        value={authorizationData.login}
        onChange={(e) =>
          setAuthorizationData({
            ...authorizationData,
            login: e.target.value,
          })
        }
        maxLength={20}
        placeholder="Логин"
      />
      <input
        value={authorizationData.password}
        onChange={(e) =>
          setAuthorizationData({
            ...authorizationData,
            password: e.target.value,
          })
        }
        maxLength={20}
        type="password"
        placeholder="Пароль"
      />
      {accountNotExist ? (
        <div className={styles.accountNotExist}>Такой учётной записи не существует !</div>
      ) : null}
      {accountDataIsCorrected ? (
        <div className={styles.accountDataInCorrected}>Введите корректные данные !</div>
      ) : null}
      <div className={styles.authorizationBtnContainer}>
        <div onClick={onSubmitLogin} className={styles.authorizationBtn}>
          Войти
        </div>
      </div>
      <div className={styles.registrationText}>
        Впервые у нас? <Link to={'/registered'}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}
