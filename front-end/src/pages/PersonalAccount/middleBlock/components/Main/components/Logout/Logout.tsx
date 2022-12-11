import { FC, useState } from 'react'
import styles from '../../styles/styles.module.scss'
import LogoutControllers from './services/LogoutControllers'
import LStylesControllers from './styles/LStylesControllers'

export const Logout: FC = () => {
  const [finalyConfirmationDeleteAcc, setFinalyConfirmationDeleteAcc] = useState(false)
  const [valueFinalyInputDelete, setValueFinalyInputDelete] = useState('')
  const [deleteAccBtn, setDeleteAccBtn] = useState(true)

  /// functions ///
  const { finalDeleteUserRequest, confirmationBtnCancel, isFinalyDeleteBtn } = LogoutControllers({
    setFinalyConfirmationDeleteAcc,
    valueFinalyInputDelete,
    setDeleteAccBtn,
  })
  /// functions ///

  /// styles ///
  const { stylesConfirmationBtnSuccess, stylesFinalyDeleteBtn } = LStylesControllers({
    finalyConfirmationDeleteAcc,
    valueFinalyInputDelete,
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
