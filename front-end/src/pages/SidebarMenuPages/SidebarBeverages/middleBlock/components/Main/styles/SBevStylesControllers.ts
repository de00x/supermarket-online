import { ISBevSControllersProps } from '../types/SBeverages.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const SBevStylesControllers = ({ errAuth, sortFly }: ISBevSControllersProps) => {
  const stylesErrAuth = cn(styles.errAuth, { [styles.errAuthActive]: errAuth })
  const stylesSort = cn(styles.sort, { [styles.sortTrue]: sortFly })
  const stylesErrAuthContainerBgdRed = cn(styles.errAuthContainer, {
    [styles.errAuthContainerBgdRed]: errAuth,
  })
  return { stylesErrAuth, stylesSort, stylesErrAuthContainerBgdRed }
}
export default SBevStylesControllers
