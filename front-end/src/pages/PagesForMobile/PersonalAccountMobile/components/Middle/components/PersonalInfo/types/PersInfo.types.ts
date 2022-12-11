import { IChangedInfoData, IChangedPassword } from '../../../types/PAccountM.types'

interface IPInfoMControllersProps {
  updateState: boolean
  changedPersonalInfo: boolean
  changedUserPassword: boolean
  changedInfoData: IChangedInfoData
  requestChangedPassword: IChangedPassword
  setUpdateState: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessDataChanged: React.Dispatch<React.SetStateAction<boolean>>
  setChangedUserPassword: React.Dispatch<React.SetStateAction<boolean>>
  setChangedPersonalInfo: React.Dispatch<React.SetStateAction<boolean>>
  setErrSuccessDataChanged: React.Dispatch<React.SetStateAction<boolean>>
  setOldPasswordsDontMatch: React.Dispatch<React.SetStateAction<boolean>>
  setNewPasswordsDontMatch: React.Dispatch<React.SetStateAction<boolean>>
  setErrDataIncorrectedText: React.Dispatch<React.SetStateAction<boolean>>
  setChangedInfoData: React.Dispatch<React.SetStateAction<IChangedInfoData>>
  setNewPasswordSuccessChanged: React.Dispatch<React.SetStateAction<boolean>>
  setRequestChangedPassword: React.Dispatch<React.SetStateAction<IChangedPassword>>
}
export type { IPInfoMControllersProps }
