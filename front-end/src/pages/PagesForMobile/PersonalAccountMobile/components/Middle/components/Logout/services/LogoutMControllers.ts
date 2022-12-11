import { ILogoutMControllersProps } from '../types/LogoutM.types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogoutMControllers = ({
  setDeleteAccountBtn,
  setConfirmationDeleteAccount,
  inputSuccessConformationDeleteAccount,
  setInputSuccessConformationDeleteAccount,
}: ILogoutMControllersProps) => {
  const navigate = useNavigate()
  const successLogoutBtn = (): void => {
    localStorage.removeItem('login')
    localStorage.removeItem('cart')
    localStorage.removeItem('id')
    navigate('/main')
  }
  const confirmationAccDelBtn = (): void => {
    setConfirmationDeleteAccount(true)
  }
  const cancelAccDelBtn = (): void => {
    setDeleteAccountBtn(false)
    setConfirmationDeleteAccount(false)
    setInputSuccessConformationDeleteAccount('')
  }
  const finalDeleteUserRequest = (): void => {
    axios
      .delete(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delete-user-account/?currentUserId=${localStorage.getItem('id')}`
      )
      .then(() => finalyDeleteSuccess())
      .catch((err) => console.log('err', err))
    const finalyDeleteSuccess = (): void => {
      setConfirmationDeleteAccount(false)
      setDeleteAccountBtn(false)
      localStorage.removeItem('login')
      localStorage.removeItem('cart')
      localStorage.removeItem('id')
      navigate('/main')
    }
  }
  const currentAccDeleteBtnSuccess = (): boolean => {
    if (inputSuccessConformationDeleteAccount === localStorage.getItem('id')) {
      return true
    } else return false
  }
  return {
    cancelAccDelBtn,
    successLogoutBtn,
    confirmationAccDelBtn,
    finalDeleteUserRequest,
    currentAccDeleteBtnSuccess,
  }
}
export default LogoutMControllers
