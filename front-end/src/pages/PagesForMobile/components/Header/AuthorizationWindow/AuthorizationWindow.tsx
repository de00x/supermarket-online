import { IAuthorizationData } from './types/Awindow.types'
import { Link } from 'react-router-dom'
import { FC, useState } from 'react'
import styles from '../styles/styles.module.scss'
import AWControllers from './services/AWControllers'

export const AuthorizationWindow: FC = (): JSX.Element => {
  const [accountNotExist, setAccountNotExist] = useState(false)
  const [accountDataIsCorrected, setAccountDataIsCorrected] = useState(false)
  const [authorizationData, setAuthorizationData] = useState<IAuthorizationData>({
    login: '',
    password: '',
  })

  /// controllers ///
  const { onSubmitLogin } = AWControllers({
    setAccountNotExist,
    authorizationData,
    setAccountDataIsCorrected,
  })
  /// controllers ///

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
