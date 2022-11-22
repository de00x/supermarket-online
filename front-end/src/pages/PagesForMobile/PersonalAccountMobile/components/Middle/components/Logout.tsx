import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import axios from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const Logout: FC = (): JSX.Element => {
  const [logoutBtn, setLogoutBtn] = useState(false)
  const [deleteAccountBtn, setDeleteAccountBtn] = useState(false)
  const [confirmationDeleteAccount, setConfirmationDeleteAccount] = useState(false)
  const [inputSuccessConformationDeleteAccount, setInputSuccessConformationDeleteAccount] =
    useState('')
  const navigate = useNavigate()

  /// onClick ///
  const successLogoutBtn = (): void => {
    localStorage.removeItem('login')
    localStorage.removeItem('cart')
    localStorage.removeItem('id')
    navigate('/main')
  }
  const confirmationAccDelBtn = (): void => {
    setConfirmationDeleteAccount(true)
  }
  const cancelAccDelBtn = (): void => {
    setDeleteAccountBtn(false)
    setConfirmationDeleteAccount(false)
    setInputSuccessConformationDeleteAccount('')
  }
  const finalDeleteUserRequest = (): void => {
    axios
      .delete(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delete-user-account/?currentUserId=${localStorage.getItem('id')}`
      )
      .then(() => finalyDeleteSuccess())
      .catch((err) => console.log('err', err))
    const finalyDeleteSuccess = (): void => {
      setConfirmationDeleteAccount(false)
      setDeleteAccountBtn(false)
      localStorage.removeItem('login')
      localStorage.removeItem('cart')
      localStorage.removeItem('id')
      navigate('/main')
    }
  }
  /// onClick ///

  /// longLogic ///
  const currentAccDeleteBtnSuccess = (): boolean => {
    if (inputSuccessConformationDeleteAccount === localStorage.getItem('id')) {
      return true
    } else return false
  }
  /// longLogic ///

  /// styles ///
  const stylesDeleteAccountConfirmationBtn = cn(styles.deleteAccountConfirmationBtn, {
    [styles.deleteAccountConfirmationBtnActive]: confirmationDeleteAccount,
  })
  const styleDeleteAccountBtnConfirmation = cn(styles.deleteAccountBtnConfirmation, {
    [styles.deleteAccountBtnConfirmationActive]: confirmationDeleteAccount,
  })
  const stylesLogoutConfirmationBtn = cn(
    cn(styles.logoutBtnConfirmation, {
      [styles.logoutConfirmationBtnNotActive]: confirmationDeleteAccount,
    })
  )
  const stylesBtnSuccessConformationDeleteAccount = cn(styles.btnSuccessConformationDeleteAccount, {
    [styles.btnSuccessConformationDeleteAccountActive]: currentAccDeleteBtnSuccess(),
  })
  /// styles ///

  return (
    <>
      {logoutBtn ? (
        <div className={stylesLogoutConfirmationBtn}>
          <div onClick={successLogoutBtn} className={styles.logoutConfirmationBtn}>
            Подтвердить
          </div>
          <div onClick={() => setLogoutBtn(!logoutBtn)} className={styles.logoutCancelBtn}>
            Отменить
          </div>
        </div>
      ) : (
        <div onClick={() => setLogoutBtn(!logoutBtn)} className={styles.logoutBtn}>
          Выйти из аккаунта
        </div>
      )}
      {deleteAccountBtn ? (
        <>
          <div className={styleDeleteAccountBtnConfirmation}>
            <div onClick={confirmationAccDelBtn} className={stylesDeleteAccountConfirmationBtn}>
              Подтвердить
            </div>
            <div onClick={cancelAccDelBtn} className={styles.logoutCancelBtn}>
              Отменить
            </div>
          </div>
          <>
            {confirmationDeleteAccount ? (
              <div className={styles.confirmationDeleteAccountCountainer}>
                <div className={styles.confirmationDeleteAccountText}>
                  Введите id в поле ввода и нажмите удалить.
                  <div>Внимание! При удалении аккаунта вся информация удаляется.</div>
                </div>
                <div className={styles.confirmationDeleteId}>{localStorage.getItem('id')}</div>
                <div className={styles.inputSuccessConformationDeleteAccount}>
                  <input
                    value={inputSuccessConformationDeleteAccount}
                    onChange={(e) => setInputSuccessConformationDeleteAccount(e.target.value)}
                    placeholder="Введите id"
                  />
                </div>
                <div className={stylesBtnSuccessConformationDeleteAccount}>
                  <button onClick={finalDeleteUserRequest} disabled={!currentAccDeleteBtnSuccess()}>
                    Удалить
                  </button>
                </div>
              </div>
            ) : null}
          </>
        </>
      ) : (
        <div
          onClick={() => setDeleteAccountBtn(true)}
          className={cn(styles.logoutBtn, styles.logoutBtnLast)}
        >
          Удалить аккаунт
        </div>
      )}
    </>
  )
}
