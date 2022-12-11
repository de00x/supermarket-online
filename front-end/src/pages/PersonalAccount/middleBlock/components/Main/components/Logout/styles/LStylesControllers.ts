import { ILSControllersProps } from '../types/Logout.types'
import styles from '../../../styles/styles.module.scss'
import cn from 'classnames'

const LStylesControllers = ({
  finalyConfirmationDeleteAcc,
  valueFinalyInputDelete,
}: ILSControllersProps) => {
  const stylesConfirmationBtnSuccess = cn(styles.confirmationBtnSuccess, {
    [styles.confirmationBtnSuccessNotActive]: finalyConfirmationDeleteAcc,
  })
  const stylesFinalyDeleteBtn = cn(styles.finalyDeleteBtn, {
    [styles.finalyDeleteBtnActive]: localStorage.getItem('id') === valueFinalyInputDelete,
  })
  return { stylesConfirmationBtnSuccess, stylesFinalyDeleteBtn }
}
export default LStylesControllers
