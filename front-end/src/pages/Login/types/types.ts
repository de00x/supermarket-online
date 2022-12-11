import { Dispatch } from 'react'

interface IUserData {
  login: string
  password: string
}
interface IDataLoginInputProps {
  userData: IUserData
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
}
interface ILoginProps {
  setBlockAuthorization: React.Dispatch<React.SetStateAction<boolean>>
}
interface ILoginControllersProps {
  userData: IUserData
  setDataError: Dispatch<React.SetStateAction<boolean>>
  setBlockAuthorization: React.Dispatch<React.SetStateAction<boolean>>
}

export type { IUserData, ILoginProps, ILoginControllersProps, IDataLoginInputProps }
