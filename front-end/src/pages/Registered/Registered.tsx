import { ReactComponent as Logo } from './img/logo.svg'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { IUserData } from './types/Registered.types'
import styles from './styles/styles.module.scss'
import RegStylesController from './styles/RegStylesController'
import RegControllers from './services/RegControllers'
import { InputLogin } from './inputs/InputLogin'
import { InputPassword } from './inputs/InputLogin copy'

export const Registered: FC = () => {
  const [incorrectInputData, setIncorrectInputData] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    login: '',
    password: '',
  })

  /// functions ///
  const { submit } = RegControllers({ userData, setRegisterError, setIncorrectInputData })
  /// functions ///

  /// styles ///
  const { stylesFormInput } = RegStylesController({
    incorrectInputData,
  })
  /// styles ///

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
              <InputLogin
                userData={userData}
                setUserData={setUserData}
                stylesFormInput={stylesFormInput}
              />
              <InputPassword
                userData={userData}
                setUserData={setUserData}
                stylesFormInput={stylesFormInput}
              />
              {registerError && (
                <div className={styles.registerError}>Такой пользователь уже существует</div>
              )}
              {incorrectInputData ? (
                <div className={styles.incorrectData}>Введите корректные данные !</div>
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
