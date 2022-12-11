import { IPIControllersProps } from '../types/PersonalI.types'
import axios, { AxiosResponse } from 'axios'

const PersonalIControllers = ({
  updateState,
  setUpdateState,
  changedInfoData,
  changedPassword,
  setChangeNameErr,
  setIsLoadingPage,
  setChangedPassword,
  setChangedInfoData,
  changedPersonalInfo,
  setSuccessDataChanged,
  setChangedPersonalInfo,
  requestChangedPassword,
  setNewPasswordsDontMatch,
  setRequestChangedPassword,
  setNewPasswordSuccessChanged,
  setOldPasswordIncorrectedText,
}: IPIControllersProps) => {
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
  const repeatNewDataPassword = (): boolean => {
    if (requestChangedPassword.newPassword === requestChangedPassword.repeatNewPassword) {
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
  return {
    cancelChanges,
    changePersonalInfo,
    onChangedPasswordForm,
    onChangedPasswordRequest,
    changedResponsePersonalInfo,
  }
}
export default PersonalIControllers
