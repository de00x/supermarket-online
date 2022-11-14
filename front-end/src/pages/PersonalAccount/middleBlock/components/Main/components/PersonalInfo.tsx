import { ReactComponent as PersonalIcon } from '../img/personalIcon.svg'
import { IChangedInfoData, IChangedPassword } from './types'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const PersonalInfo: FC = (): JSX.Element => {
  const [newPasswordsDontMatch, setNewPasswordsDontMatch] = useState(false)
  const [changedPersonalInfo, setChangedPersonalInfo] = useState(false)
  const [successDataChanged, setSuccessDataChanged] = useState(false)
  const [changedPassword, setChangedPassword] = useState(false)
  const [changeNameErr, setChangeNameErr] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [oldPasswordIncorrectedText, setOldPasswordIncorrectedText] =
    useState(false)
  const [newPasswordSuccessChanged, setNewPasswordSuccessChanged] =
    useState(false)
  const [requestChangedPassword, setRequestChangedPassword] =
    useState<IChangedPassword>({
      oldPassword: 'Введите старый пароль',
      newPassword: 'Введите новый пароль',
      repeatNewPassword: 'Повторите новый пароль',
    })
  const [changedInfoData, setChangedInfoData] = useState<IChangedInfoData>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    telefone: '',
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
    } else onOldPasswordIncorrected()
  }
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
  }
  const onChangedPasswordRequest = (): void => {
    if (changedPassword && repeatNewDataPassword()) {
      axios
        .post('/coincidence-pass', {
          id: localStorage.getItem('id'),
          oldPassword: requestChangedPassword.oldPassword,
        })
        .then((res) => axiosRequestChangedPassword(res))
        .catch(() => alert('catch'))
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
    setOldPasswordIncorrectedText(false)
    if (!changedPassword) {
      setChangedPassword(true)
    } else {
      setChangedPassword(false)
      setRequestChangedPassword({
        ...requestChangedPassword,
        oldPassword: 'Введите старый пароль',
        newPassword: 'Введите новый пароль',
        repeatNewPassword: 'Повторите новый пароль',
      })
    }
  }
  const onOldPasswordIncorrected = (): void => {
    setOldPasswordIncorrectedText(true)
    setTimeout(() => {
      setOldPasswordIncorrectedText(false)
    }, 5000)
  }
  const onPasswordsDontMatch = (): void => {
    setNewPasswordsDontMatch(true)
    setTimeout(() => {
      setNewPasswordsDontMatch(false)
    }, 5000)
  }
  const onSuccessDataChanged = (): void => {
    setUpdateState(!updateState)
    setSuccessDataChanged(true)
    setTimeout(() => {
      setSuccessDataChanged(false)
    }, 5000)
  }
  const changePersonalInfo = (): void => {
    if (!changedPassword) {
      if (changedPersonalInfo) {
        if (isNewDataUser()) {
          if (localStorage.getItem('id') === changedInfoData.id) {
            setChangedPersonalInfo(false)
            axios
              .put('/edit-userInfo', {
                id: localStorage.getItem('id'),
                name: changedInfoData.name,
                lastName: changedInfoData.lastName,
                email: changedInfoData.email,
                telefone: changedInfoData.telefone,
              })
              .then(() => onSuccessDataChanged())
              .catch((err) => console.log('err', err))
          } else {
            setChangedPersonalInfo(false)
            axios
              .post('/personal-data', {
                id: localStorage.getItem('id'),
                name: changedInfoData.name,
                lastName: changedInfoData.lastName,
                email: changedInfoData.email,
                telefone: changedInfoData.telefone,
              })
              .then((res) => console.log('res', res))
              .catch((err) => console.log('err', err))
          }
        } else smallDataChangeErr()
      } else setChangedPersonalInfo(!changedPersonalInfo)
    }
  }
  const cancelChanges = (): void => {
    setChangedPersonalInfo(false)
    axios
      .post('/personal-data', {
        id: localStorage.getItem('id'),
      })
      .then((res) => changedResponsePersonalInfo(res))
      .catch((err) => console.log('err', err))
  }
  const smallDataChangeErr = (): void => {
    setChangeNameErr(true)
    setTimeout(() => {
      setChangeNameErr(false)
    }, 10000)
  }
  /// onClick ///

  /// longLogic ///
  const repeatNewDataPassword = (): boolean => {
    if (
      requestChangedPassword.newPassword ===
      requestChangedPassword.repeatNewPassword
    ) {
      return true
    } else return false
  }
  const isNewDataUser = (): boolean => {
    if (
      changedInfoData.name.length > 1 &&
      changedInfoData.lastName.length > 3 &&
      changedInfoData.email.length > 4 &&
      changedInfoData.telefone.length > 4
    ) {
      return true
    } else return false
  }
  /// longLogic ///

  /// styles ///
  const stylesChangeDataContainer = cn(styles.changeDataContainer, {
    [styles.changeDataContainerActive]: changedPersonalInfo,
    [styles.changeDataContainerSuccessTextOn]: newPasswordsDontMatch,
    [styles.changeDataContainerSuccessTextOn2]: successDataChanged,
    [styles.changeDataContainerSuccessTextOn3]: oldPasswordIncorrectedText,
    [styles.changeDataContainerSuccessTextOn4]: newPasswordSuccessChanged,
  })
  const stylesInputsChangesEmailTel = cn(styles.inputChangedEmail, {
    [styles.inputsChangesEmailTelErr]: changeNameErr,
  })
  const stylesInputsChangesName = cn(styles.inputsChangedName, {
    [styles.inputsChangedNameErr]: changeNameErr,
  })
  /// styles ///

  return (
    <>
      <div className={styles.personalInfoContainer}>
        <div className={styles.personalInfo}>
          <PersonalIcon /> Персональная информация
        </div>
        {changedPassword ? (
          <>
            <div className={styles.changedPasswordContainer}>
              <input
                onChange={(e) =>
                  setRequestChangedPassword({
                    ...requestChangedPassword,
                    oldPassword: e.target.value,
                  })
                }
                placeholder={requestChangedPassword.oldPassword}
                type="password"
              />
              <input
                onChange={(e) =>
                  setRequestChangedPassword({
                    ...requestChangedPassword,
                    newPassword: e.target.value,
                  })
                }
                placeholder={requestChangedPassword.newPassword}
                type="password"
              />
              <input
                onChange={(e) =>
                  setRequestChangedPassword({
                    ...requestChangedPassword,
                    repeatNewPassword: e.target.value,
                  })
                }
                placeholder={requestChangedPassword.repeatNewPassword}
                type="password"
              />
            </div>
            {oldPasswordIncorrectedText ? (
              <div className={styles.oldPasswordIncorrectedText}>
                Старый пароль не верный
              </div>
            ) : null}
            {newPasswordsDontMatch ? (
              <div className={styles.newPassErr}>
                Новые пароли не совпадают.
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className={styles.personalLastNameContainer}>
              <div>Фамилия, имя:</div>
              {changedPersonalInfo ? (
                <div className={stylesInputsChangesName}>
                  <input
                    value={changedInfoData.name}
                    onChange={(e) =>
                      setChangedInfoData({
                        ...changedInfoData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Фамилия"
                  />
                  <input
                    value={changedInfoData.lastName}
                    onChange={(e) =>
                      setChangedInfoData({
                        ...changedInfoData,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Имя"
                  />
                </div>
              ) : (
                <div>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.name === undefined &&
                      changedInfoData.lastName === undefined ? (
                        <div
                          onClick={changePersonalInfo}
                          className={styles.fillDataText}
                        >
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          {changedInfoData.name}, {changedInfoData.lastName}
                        </>
                      )}
                    </>
                  )}
                </div>
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
                  className={stylesInputsChangesEmailTel}
                  placeholder="Email"
                />
              ) : (
                <>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.email === undefined ? (
                        <div
                          onClick={changePersonalInfo}
                          className={styles.fillDataText}
                        >
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          <div>{changedInfoData.email}</div>
                        </>
                      )}
                    </>
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
                  className={stylesInputsChangesEmailTel}
                  placeholder="Телефон"
                />
              ) : (
                <>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.telefone === undefined ? (
                        <div
                          onClick={changePersonalInfo}
                          className={styles.fillDataText}
                        >
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          <div>
                            <div>{changedInfoData.telefone}</div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {newPasswordSuccessChanged ? (
          <div className={styles.newPasswordSuccessChangedText}>
            Вы успешно изменили пароль.
          </div>
        ) : null}
        {successDataChanged ? (
          <div className={styles.successDataChanged}>
            Данные были успешно изменены.
          </div>
        ) : null}
        <div className={stylesChangeDataContainer}>
          {changedPassword ? (
            <div
              onClick={onChangedPasswordRequest}
              className={styles.saveNewPasswordBtn}
            >
              Сохранить изменения
            </div>
          ) : (
            <div onClick={changePersonalInfo}>Изменить данные</div>
          )}
          {changedPersonalInfo ? (
            <div onClick={cancelChanges}>Отменить изменения</div>
          ) : (
            <>
              {changedPassword ? (
                <div
                  onClick={onChangedPasswordForm}
                  className={styles.cancelChangesPass}
                >
                  Отменить изменения
                </div>
              ) : (
                <div onClick={onChangedPasswordForm}>Изменить пароль</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
