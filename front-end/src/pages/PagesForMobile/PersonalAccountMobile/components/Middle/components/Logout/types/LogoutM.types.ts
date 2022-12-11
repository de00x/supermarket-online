interface ILogoutMSControllersProps {
  confirmationDeleteAccount: boolean
  currentAccDeleteBtnSuccess: () => boolean
}
interface ILogoutMControllersProps {
  inputSuccessConformationDeleteAccount: string
  setDeleteAccountBtn: React.Dispatch<React.SetStateAction<boolean>>
  setConfirmationDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>
  setInputSuccessConformationDeleteAccount: React.Dispatch<React.SetStateAction<string>>
}
export type { ILogoutMControllersProps, ILogoutMSControllersProps }
