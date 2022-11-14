import { ReactComponent as PersonalIcon } from '../img/personalIcon.svg'
import { IChangedInfoData, IChangedPassword } from '../types'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const PersonalInfo: FC = (): JSX.Element => {
  const [newPasswordSuccessChanged, setNewPasswordSuccessChanged] =
    useState(false)
  const [errDataIncorrectedText, setErrDataIncorrectedText] = useState(false)
  const [oldPasswordsDontMatch, setOldPasswordsDontMatch] = useState(false)
  const [newPasswordsDontMatch, setNewPasswordsDontMatch] = useState(false)
  const [changedPersonalInfo, setChangedPersonalInfo] = useState(false)
  const [changedUserPassword, setChangedUserPassword] = useState(false)
  const [successDataChanged, setSuccessDataChanged] = useState(false)
  const [errDataChanged, setErrSuccessDataChanged] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [changedInfoData, setChangedInfoData] = useState<IChangedInfoData>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    telefone: '',
  })
  const [requestChangedPassword, setRequestChangedPassword] =
    useState<IChangedPassword>({
      oldPassword: 'Введите старый пароль',
      newPassword: 'Введите новый пароль',
      repeatNewPassword: 'Повторите новый пароль',
    })

  useEffect(() => {
    axios
      .post('/personal-data', {
        id: localStorage.getItem('id'),
      })
      .then((res) => changedResponsePersonalInfo(res))
      .catch((err) => console.log('err', err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateState])

  /// onClick ///

  const changedResponsePersonalInfo = (res: AxiosResponse): void => {
    setChangedInfoData({
      ...changedInfoData,
      id: res.data.id,
      name: res.data.name,
      lastName: res.data.lastName,
      email: res.data.email,
      telefone: res.data.telefone,
    })
    setIsLoadingPage(false)
    setUpdateState(false)
  }

  const cancelChangedData = (): void => {
    if (changedPersonalInfo || changedUserPassword) {
      setErrDataIncorrectedText(false)
      setErrSuccessDataChanged(false)
      setChangedUserPassword(false)
      setChangedPersonalInfo(false)
      setSuccessDataChanged(false)
    }
    setRequestChangedPassword({
      ...requestChangedPassword,
      oldPassword: 'Введите старый пароль',
      newPassword: 'Введите новый пароль',
      repeatNewPassword: 'Повторите новый пароль',
    })
  }

  const isNewDataUserLength = (): boolean => {
    if (
      (changedInfoData.name.length > 1 &&
        changedInfoData.lastName.length > 3) ||
      changedInfoData.email.length > 4 ||
      changedInfoData.telefone.length > 4
    ) {
      return true
    } else return false
  }

  const onSuccessDataChanged = (): void => {
    setUpdateState(!updateState)
    setSuccessDataChanged(true)
    setChangedPersonalInfo(false)
    setTimeout(() => {
      setSuccessDataChanged(false)
    }, 5000)
  }
  const onErrDataChanged = (): void => {
    setUpdateState(!updateState)
    setErrSuccessDataChanged(true)
    setChangedPersonalInfo(false)
    setTimeout(() => {
      setErrSuccessDataChanged(false)
    }, 5000)
  }
  const onErrDataIncorrectedText = (): void => {
    setUpdateState(!updateState)
    setErrDataIncorrectedText(true)
    setTimeout(() => {
      setErrDataIncorrectedText(false)
    }, 5000)
  }

  const changePersonalInfo = (): void => {
    if (isNewDataUserLength()) {
      if (localStorage.getItem('id') === changedInfoData.id) {
        axios
          .put('/edit-userInfo', {
            id: localStorage.getItem('id'),
            name: changedInfoData.name,
            lastName: changedInfoData.lastName,
            email: changedInfoData.email,
            telefone: changedInfoData.telefone,
          })
          .then(() => onSuccessDataChanged())
          .catch(() => onErrDataChanged())
      } else {
        axios
          .post('/personal-data', {
            id: localStorage.getItem('id'),
            name: changedInfoData.name,
            lastName: changedInfoData.lastName,
            email: changedInfoData.email,
            telefone: changedInfoData.telefone,
          })
          .then(() => onSuccessDataChanged())
          .catch(() => onErrDataChanged())
      }
    } else onErrDataIncorrectedText()
  }

  const onChangedPasswordRequest = (): void => {
    if (repeatNewDataPassword()) {
      axios
        .post('/coincidence-pass', {
          id: localStorage.getItem('id'),
          oldPassword: requestChangedPassword.oldPassword,
        })
        .then((res) => axiosRequestChangedPassword(res))
        .catch((err) => console.log('err', err))
    } else onPasswordsDontMatch()
  }

  const onNewPasswordSuccessChanged = (): void => {
    setNewPasswordSuccessChanged(true)
    setTimeout(() => {
      setNewPasswordSuccessChanged(false)
    }, 5000)
  }

  const onChangedPasswordForm = (): void => {
    setNewPasswordsDontMatch(false)
    setOldPasswordsDontMatch(false)
    if (!changedUserPassword) {
      setChangedUserPassword(true)
    } else {
      setChangedUserPassword(false)
      setRequestChangedPassword({
        ...requestChangedPassword,
        oldPassword: 'Введите старый пароль',
        newPassword: 'Введите новый пароль',
        repeatNewPassword: 'Повторите новый пароль',
      })
    }
  }

  const axiosRequestChangedPassword = (res: AxiosResponse): void => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (res.data.success) {
      onChangedPasswordForm()
      axios
        .put('/edit-user-password', {
          id: localStorage.getItem('id'),
          login: localStorage.getItem('login'),
          newPassword: requestChangedPassword.newPassword,
        })
        .then(() => onNewPasswordSuccessChanged())
        .catch((err) => console.log('err', err))
    } else onOldPasswordsDontMatch()
  }

  const onPasswordsDontMatch = (): void => {
    setNewPasswordsDontMatch(true)
    setTimeout(() => {
      setNewPasswordsDontMatch(false)
    }, 5000)
  }
  const onOldPasswordsDontMatch = (): void => {
    setOldPasswordsDontMatch(true)
    setTimeout(() => {
      setOldPasswordsDontMatch(false)
    }, 5000)
  }

  /// onClick ///

  /// longLogic ///
  const placeholderOldPassword =
    requestChangedPassword.oldPassword.length !== 0
      ? requestChangedPassword.oldPassword
      : 'Введите старый пароль'

  const placeholderNewPassword =
    requestChangedPassword.oldPassword.length !== 0
      ? requestChangedPassword.newPassword
      : 'Введите новый пароль'

  const placeholderRepeatNewPassword =
    requestChangedPassword.repeatNewPassword.length !== 0
      ? requestChangedPassword.repeatNewPassword
      : 'Повторите новый пароль'

  const repeatNewDataPassword = (): boolean => {
    if (
      requestChangedPassword.newPassword ===
      requestChangedPassword.repeatNewPassword
    ) {
      return true
    } else return false
  }
  /// longLogic ///

  /// styles ///
  const stylesChangedDataBtnActive = cn(styles.changedData, {
    [styles.changedDataBtnActive]: changedPersonalInfo || changedUserPassword,
  })
  /// styles ///

  return (
    <div className={styles.personalInfoContainer}>
      <div className={styles.personalInfoHeader}>
        <PersonalIcon /> Персональная информация
      </div>
      {changedUserPassword ? (
        <div className={styles.changedPasswordContainer}>
          <input
            placeholder={placeholderOldPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                oldPassword: e.target.value,
              })
            }
          />
          <input
            placeholder={placeholderNewPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                newPassword: e.target.value,
              })
            }
          />
          <input
            placeholder={placeholderRepeatNewPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                repeatNewPassword: e.target.value,
              })
            }
          />
        </div>
      ) : (
        <>
          <div className={styles.personalLastNameContainer}>
            <div>Фамилия, имя:</div>
            {changedPersonalInfo ? (
              <div className={styles.changedNameInputContainer}>
                <input
                  value={changedInfoData.lastName}
                  onChange={(e) =>
                    setChangedInfoData({
                      ...changedInfoData,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Фамилия"
                />
                <input
                  value={changedInfoData.name}
                  onChange={(e) =>
                    setChangedInfoData({
                      ...changedInfoData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Имя"
                />
              </div>
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>
                        {changedInfoData.lastName}, {changedInfoData.name}
                      </>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.personalEmailContainer}>
            <div>Email:</div>
            {changedPersonalInfo ? (
              <input
                value={changedInfoData.email}
                onChange={(e) =>
                  setChangedInfoData({
                    ...changedInfoData,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
              />
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>{changedInfoData.email}</>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.personalTelContainer}>
            <div>Телефон:</div>
            {changedPersonalInfo ? (
              <input
                value={changedInfoData.telefone}
                onChange={(e) =>
                  setChangedInfoData({
                    ...changedInfoData,
                    telefone: e.target.value,
                  })
                }
                placeholder="Телефон"
              />
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>{changedInfoData.telefone}</>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
      {successDataChanged || newPasswordSuccessChanged ? (
        <div className={styles.dataSuccessChangedText}>
          Данные были успешно изменены.
        </div>
      ) : null}
      {errDataChanged ? (
        <div className={styles.createNewDataErrText}>
          Возникла непредвиденная ошибка.
        </div>
      ) : null}
      {errDataIncorrectedText ? (
        <div className={styles.incorrectedNewDataCreateText}>
          Введите корректные данные.
        </div>
      ) : null}
      {newPasswordsDontMatch ? (
        <div className={styles.incorrectedNewDataCreateText}>
          Новые пароли не совпадают.
        </div>
      ) : null}
      {oldPasswordsDontMatch ? (
        <div className={styles.incorrectedNewDataCreateText}>
          Старые пароли не совпадают.
        </div>
      ) : null}
      <div className={styles.changedDataContainer}>
        {changedUserPassword ? (
          <div
            onClick={onChangedPasswordRequest}
            className={stylesChangedDataBtnActive}
          >
            Сохранить изменения
          </div>
        ) : (
          <>
            {changedPersonalInfo ? (
              <div
                onClick={changePersonalInfo}
                className={stylesChangedDataBtnActive}
              >
                Сохранить изменения
              </div>
            ) : (
              <div
                onClick={() => setChangedPersonalInfo(true)}
                className={stylesChangedDataBtnActive}
              >
                Изменить данные
              </div>
            )}
          </>
        )}
        {changedPersonalInfo || changedUserPassword ? (
          <div onClick={cancelChangedData} className={styles.changedCancel}>
            Отменить изменения
          </div>
        ) : (
          <div
            onClick={() => setChangedUserPassword(true)}
            className={styles.changedPassword}
          >
            Изменить пароль
          </div>
        )}
      </div>
    </div>
  )
}
