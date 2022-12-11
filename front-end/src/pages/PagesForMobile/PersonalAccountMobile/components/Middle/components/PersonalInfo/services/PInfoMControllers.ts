import axios, { AxiosResponse } from 'axios'
import { IPInfoMControllersProps } from '../types/PersInfo.types'

const PInfoMControllers = ({
  updateState,
  setUpdateState,
  changedInfoData,
  setIsLoadingPage,
  setChangedInfoData,
  changedPersonalInfo,
  changedUserPassword,
  setSuccessDataChanged,
  requestChangedPassword,
  setChangedUserPassword,
  setChangedPersonalInfo,
  setErrSuccessDataChanged,
  setOldPasswordsDontMatch,
  setNewPasswordsDontMatch,
  setErrDataIncorrectedText,
  setRequestChangedPassword,
  setNewPasswordSuccessChanged,
}: IPInfoMControllersProps) => {
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
      (changedInfoData.name.length > 1 && changedInfoData.lastName.length > 3) ||
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
    if (requestChangedPassword.newPassword === requestChangedPassword.repeatNewPassword) {
      return true
    } else return false
  }
  return {
    cancelChangedData,
    changePersonalInfo,
    placeholderOldPassword,
    placeholderNewPassword,
    onChangedPasswordRequest,
    changedResponsePersonalInfo,
    placeholderRepeatNewPassword,
  }
}
export default PInfoMControllers
