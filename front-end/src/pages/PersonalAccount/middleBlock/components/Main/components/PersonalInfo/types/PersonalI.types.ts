import { Dispatch, SetStateAction } from 'react'

interface IChangedPassword {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}
interface IChangedInfoData {
  id: string
  name: string
  email: string
  lastName: string
  telefone: string
}
interface IPISControllersProps {
  changeNameErr: boolean
  successDataChanged: boolean
  changedPersonalInfo: boolean
  newPasswordsDontMatch: boolean
  newPasswordSuccessChanged: boolean
  oldPasswordIncorrectedText: boolean
}
interface IPIControllersProps {
  updateState: boolean
  changedPassword: boolean
  changedPersonalInfo: boolean
  changedInfoData: IChangedInfoData
  requestChangedPassword: IChangedPassword
  setUpdateState: Dispatch<SetStateAction<boolean>>
  setIsLoadingPage: Dispatch<SetStateAction<boolean>>
  setChangeNameErr: Dispatch<SetStateAction<boolean>>
  setChangedPassword: Dispatch<SetStateAction<boolean>>
  setSuccessDataChanged: Dispatch<SetStateAction<boolean>>
  setChangedPersonalInfo: Dispatch<SetStateAction<boolean>>
  setNewPasswordsDontMatch: Dispatch<SetStateAction<boolean>>
  setChangedInfoData: Dispatch<SetStateAction<IChangedInfoData>>
  setNewPasswordSuccessChanged: Dispatch<SetStateAction<boolean>>
  setOldPasswordIncorrectedText: Dispatch<SetStateAction<boolean>>
  setRequestChangedPassword: Dispatch<SetStateAction<IChangedPassword>>
}
interface IIPersDataEmailProps {
  changedInfoData: IChangedInfoData
  stylesInputsChangesEmailTel: string
  setChangedInfoData: Dispatch<React.SetStateAction<IChangedInfoData>>
}
interface IInputPersDataProps {
  changedInfoData: IChangedInfoData
  setChangedInfoData: Dispatch<React.SetStateAction<IChangedInfoData>>
}
interface IInputPasswordProps {
  requestChangedPassword: IChangedPassword
  setRequestChangedPassword: Dispatch<SetStateAction<IChangedPassword>>
}

export type {
  IChangedPassword,
  IChangedInfoData,
  IPIControllersProps,
  IInputPasswordProps,
  IInputPersDataProps,
  IPISControllersProps,
  IIPersDataEmailProps,
}
