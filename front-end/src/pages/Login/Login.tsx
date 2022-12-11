import { DataLoginInput, DataPassInput } from './inputs'
import { ILoginProps, IUserData } from './types/types'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import LoginControllers from './services/LoginControllers'

export const Login: FC<ILoginProps> = ({ setBlockAuthorization }) => {
  const [dataError, setDataError] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    login: '',
    password: '',
  })

  /// functions ///
  const { submit } = LoginControllers({ userData, setDataError, setBlockAuthorization })
  /// functions ///

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={submit}>
            <div className={styles.formInput}>
              <DataLoginInput userData={userData} setUserData={setUserData} />
            </div>
            <div className={styles.formInput}>
              <DataPassInput userData={userData} setUserData={setUserData} />
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
