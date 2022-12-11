import { Dispatch, SetStateAction } from 'react'

interface IUserData {
  login: string
  password: string
}
interface IRegSControllerProps {
  incorrectInputData: boolean
}
interface IUserDataInputsProps {
  userData: IUserData
  stylesFormInput: string
  setUserData: Dispatch<SetStateAction<IUserData>>
}
interface IRegControllersProps {
  userData: IUserData
  setRegisterError: Dispatch<SetStateAction<boolean>>
  setIncorrectInputData: Dispatch<SetStateAction<boolean>>
}

export type { IUserData, IRegSControllerProps, IRegControllersProps, IUserDataInputsProps }
