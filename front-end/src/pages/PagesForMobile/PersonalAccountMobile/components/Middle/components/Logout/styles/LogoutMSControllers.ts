import cn from 'classnames'
import styles from '../../../styles/styles.module.scss'
import { ILogoutMSControllersProps } from '../types/LogoutM.types'

const LogoutMSControllers = ({
  confirmationDeleteAccount,
  currentAccDeleteBtnSuccess,
}: ILogoutMSControllersProps) => {
  const stylesDeleteAccountConfirmationBtn = cn(styles.deleteAccountConfirmationBtn, {
    [styles.deleteAccountConfirmationBtnActive]: confirmationDeleteAccount,
  })
  const styleDeleteAccountBtnConfirmation = cn(styles.deleteAccountBtnConfirmation, {
    [styles.deleteAccountBtnConfirmationActive]: confirmationDeleteAccount,
  })
  const stylesLogoutConfirmationBtn = cn(
    cn(styles.logoutBtnConfirmation, {
      [styles.logoutConfirmationBtnNotActive]: confirmationDeleteAccount,
    })
  )
  const stylesBtnSuccessConformationDeleteAccount = cn(styles.btnSuccessConformationDeleteAccount, {
    [styles.btnSuccessConformationDeleteAccountActive]: currentAccDeleteBtnSuccess(),
  })
  return {
    stylesLogoutConfirmationBtn,
    styleDeleteAccountBtnConfirmation,
    stylesDeleteAccountConfirmationBtn,
    stylesBtnSuccessConformationDeleteAccount,
  }
}
export default LogoutMSControllers
