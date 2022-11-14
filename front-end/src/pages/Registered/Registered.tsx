import { ReactComponent as Logo } from './img/logo.svg'
import { FC, SyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IUserData } from './types'
import axios from 'axios'
import cn from 'classnames'
import styles from './styles.module.scss'

export const Registered: FC = () => {
  const [incorrectInputData, setIncorrectInputData] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    login: '',
    password: '',
  })

  /// styles ///
  const stylesFormInput = cn(styles.formInput, {
    [styles.inputErrData]: incorrectInputData,
  })
  /// styles ///

  /// onClick ///
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
  /// onClick ///

  const navigate = useNavigate()

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.header}>Регистрация</div>
          <div className={styles.form}>
            <form onSubmit={submit}>
              <div className={stylesFormInput}>
                <input
                  placeholder="Логин"
                  value={userData.login}
                  onChange={(e) =>
                    setUserData({ ...userData, login: e.target.value })
                  }
                  type="login"
                ></input>
              </div>
              <div className={stylesFormInput}>
                <input
                  placeholder="Пароль"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  type="password"
                ></input>
              </div>
              {registerError && (
                <div className={styles.registerError}>
                  Такой пользователь уже существует
                </div>
              )}
              {incorrectInputData ? (
                <div className={styles.incorrectData}>
                  Введите корректные данные !
                </div>
              ) : null}
              <div className={styles.btnContainer}>
                <button type="submit" className={styles.signBtn}>
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
          <div className={styles.registeredLink}>
            <Link to={'/login'}>Уже есть аккаунт?</Link>
          </div>
          <div className={styles.footer}>2019-2022</div>
        </div>
      </div>
    </>
  )
}
