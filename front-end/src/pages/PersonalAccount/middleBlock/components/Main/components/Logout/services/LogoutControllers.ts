import { ILControllersProps } from '../types/Logout.types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LogoutControllers = ({
  setDeleteAccBtn,
  valueFinalyInputDelete,
  setFinalyConfirmationDeleteAcc,
}: ILControllersProps) => {
  const navigate = useNavigate()
  const finalDeleteUserRequest = (): void => {
    axios
      .delete(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delete-user-account/?currentUserId=${localStorage.getItem('id')}`
      )
      .then(() => finalyDeleteSuccess())
      .catch((err) => console.log('err', err))
    const finalyDeleteSuccess = (): void => {
      setFinalyConfirmationDeleteAcc(false)
      setDeleteAccBtn(false)
      localStorage.removeItem('login')
      localStorage.removeItem('cart')
      localStorage.removeItem('id')
      navigate('/main')
    }
  }
  const confirmationBtnCancel = (): void => {
    setDeleteAccBtn(true)
    setFinalyConfirmationDeleteAcc(false)
  }
  const isFinalyDeleteBtn = (): boolean => {
    if (valueFinalyInputDelete === localStorage.getItem('id')) {
      return false
    }
    return true
  }
  return { finalDeleteUserRequest, confirmationBtnCancel, isFinalyDeleteBtn }
}
export default LogoutControllers
