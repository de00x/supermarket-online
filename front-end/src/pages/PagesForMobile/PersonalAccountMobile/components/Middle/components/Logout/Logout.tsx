import { FC, useState } from 'react'
import cn from 'classnames'
import styles from '../../styles/styles.module.scss'
import LogoutMControllers from './services/LogoutMControllers'
import LogoutMSControllers from './styles/LogoutMSControllers'

export const Logout: FC = (): JSX.Element => {
  const [logoutBtn, setLogoutBtn] = useState(false)
  const [deleteAccountBtn, setDeleteAccountBtn] = useState(false)
  const [confirmationDeleteAccount, setConfirmationDeleteAccount] = useState(false)
  const [inputSuccessConformationDeleteAccount, setInputSuccessConformationDeleteAccount] =
    useState('')

  /// controllers ///
  const {
    cancelAccDelBtn,
    successLogoutBtn,
    confirmationAccDelBtn,
    finalDeleteUserRequest,
    currentAccDeleteBtnSuccess,
  } = LogoutMControllers({
    setDeleteAccountBtn,
    setConfirmationDeleteAccount,
    inputSuccessConformationDeleteAccount,
    setInputSuccessConformationDeleteAccount,
  })
  /// controllers ///

  /// styles ///
  const {
    stylesLogoutConfirmationBtn,
    styleDeleteAccountBtnConfirmation,
    stylesDeleteAccountConfirmationBtn,
    stylesBtnSuccessConformationDeleteAccount,
  } = LogoutMSControllers({ confirmationDeleteAccount, currentAccDeleteBtnSuccess })
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
