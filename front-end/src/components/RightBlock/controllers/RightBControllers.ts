import { IRBControllersOutProps, IRBControllersProps } from '../types/RightBlock.types'
import { clearItems } from '../../../redux/slices/slice'

const RightBControllers = ({
  setConfirmationOutAccount,
  dispatch,
}: IRBControllersProps): IRBControllersOutProps => {
  const logOutFromAccount = (): void => {
    setConfirmationOutAccount(true)
  }
  const logOutCancel = (): void => {
    setConfirmationOutAccount(false)
  }
  const logOutYes = (): void => {
    setConfirmationOutAccount(false)
    localStorage.removeItem('login')
    localStorage.removeItem('id')
    localStorage.removeItem('cart')
    localStorage.removeItem('location')
    dispatch(clearItems())
    window.location.reload()
  }
  const isAuth = localStorage.getItem('login') === ''
  return { logOutFromAccount, logOutCancel, logOutYes, isAuth }
}
export default RightBControllers
