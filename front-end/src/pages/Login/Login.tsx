import { FC, SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { IUserData } from './types'
import axios from 'axios'
import styles from './styles.module.scss'

interface ILoginProps {
  setBlockAuthorization: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login: FC<ILoginProps> = ({ setBlockAuthorization }) => {
  const [dataError, setDataError] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    login: '',
    password: '',
  })
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
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={submit}>
            <div className={styles.formInput}>
              <input
                placeholder="Логин"
                value={userData.login}
                onChange={(e) => setUserData({ ...userData, login: e.target.value })}
                type="login"
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                placeholder="Пароль"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                type="password"
              ></input>
            </div>
            <div className={styles.remember}>
              <label>
                <input type="checkbox"></input>
              </label>
              <span>Запомнить меня</span>
            </div>
            {dataError && (
              <>
                <div className={styles.dataErr}>Такой учетной записи не существует</div>
              </>
            )}
            <div className={styles.btnContainer}>
              <button type="submit" className={styles.signBtn}>
                Войти
              </button>
            </div>
          </form>
        </div>
        <div className={styles.question}>Впервые здесь?</div>
        <div className={styles.registeredLink}>
          <Link to={'/registered'}>Создать новую учетную запись</Link>
        </div>
      </div>
    </>
  )
}
