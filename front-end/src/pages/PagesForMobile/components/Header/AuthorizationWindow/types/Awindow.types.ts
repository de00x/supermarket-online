interface IAuthorizationData {
  login: string
  password: string
}
interface IAWControllersProps {
  authorizationData: IAuthorizationData
  setAccountNotExist: React.Dispatch<React.SetStateAction<boolean>>
  setAccountDataIsCorrected: React.Dispatch<React.SetStateAction<boolean>>
}

export type { IAWControllersProps, IAuthorizationData }
