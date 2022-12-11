import { IHControllersProps } from '../types/Header.types'

const HeaderControllers = (): IHControllersProps => {
  const successExitOnAccount = (): void => {
    localStorage.removeItem('login')
    localStorage.removeItem('cart')
    localStorage.removeItem('id')
    window.location.reload()
  }
  return { successExitOnAccount }
}
export default HeaderControllers
