import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import axios from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const Logout: FC = () => {
  const [valueFinalyInputDelete, setValueFinalyInputDelete] = useState('')
  const [finalyConfirmationDeleteAcc, setFinalyConfirmationDeleteAcc] = useState(false)
  const [deleteAccBtn, setDeleteAccBtn] = useState(true)
  const navigate = useNavigate()

  /// onClick ///
  const finalDeleteUserRequest = (): void => {
    axios
      .delete(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delete-user-account/?currentUserId=${localStorage.getItem('id')}`
      )
      .then(() => finalyDeleteSuccess())
      .catch((err) => console.log('err', err))
    const finalyDeleteSuccess = (): void => {
      setFinalyConfirmationDeleteAcc(false)
      setDeleteAccBtn(false)
      localStorage.removeItem('login')
      localStorage.removeItem('cart')
      localStorage.removeItem('id')
      navigate('/main')
    }
  }
  const confirmationBtnCancel = (): void => {
    setDeleteAccBtn(true)
    setFinalyConfirmationDeleteAcc(false)
  }
  /// onClick ///

  /// longLogic ///
  const isFinalyDeleteBtn = (): boolean => {
    if (valueFinalyInputDelete === localStorage.getItem('id')) {
      return false
    }
    return true
  }
  /// longLogic ///

  /// styles ///
  const stylesConfirmationBtnSuccess = cn(styles.confirmationBtnSuccess, {
    [styles.confirmationBtnSuccessNotActive]: finalyConfirmationDeleteAcc,
  })
  const stylesFinalyDeleteBtn = cn(styles.finalyDeleteBtn, {
    [styles.finalyDeleteBtnActive]: localStorage.getItem('id') === valueFinalyInputDelete,
  })
  /// styles ///

  return (
    <>
      <div className={styles.deleteAccContainer}>
        {deleteAccBtn ? (
          <div onClick={() => setDeleteAccBtn(false)} className={styles.deleteAccBtn}>
            Удалить аккаунт
          </div>
        ) : (
          <div className={styles.confirmationBtnContainer}>
            <div
              onClick={() => setFinalyConfirmationDeleteAcc(true)}
              className={stylesConfirmationBtnSuccess}
            >
              Подтвердить
            </div>
            <div onClick={confirmationBtnCancel} className={styles.confirmationBtnCancel}>
              Отменить
            </div>
          </div>
        )}
      </div>
      {finalyConfirmationDeleteAcc ? (
        <div className={styles.finalyConfirmationDeleteAccContainer}>
          <div className={styles.finalyConfirmationDeleteAcc}>
            <div className={styles.finalyConfirmationDeleteText}>
              Введите id в поле ввода и нажмите удалить.
              <div>Внимание! При удалении аккаунта вся информация удаляется.</div>
            </div>
            <div className={styles.finalyConfirmationDeleteId}>{localStorage.getItem('id')}</div>
            <div className={styles.finalyConfirmationDeleteInput}>
              <input
                value={valueFinalyInputDelete}
                onChange={(e) => setValueFinalyInputDelete(e.target.value)}
                placeholder="Введите id"
              />
            </div>
            <div className={stylesFinalyDeleteBtn}>
              <button onClick={finalDeleteUserRequest} disabled={isFinalyDeleteBtn()}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
