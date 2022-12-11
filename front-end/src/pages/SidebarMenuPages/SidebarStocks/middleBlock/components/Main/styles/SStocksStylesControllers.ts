import { ISSStylesControllersProps } from '../types/SStocks.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const SStocksStylesControllers = ({ sortFly, errAuth }: ISSStylesControllersProps) => {
  const stylesSort = cn(styles.sort, { [styles.sortTrue]: sortFly })
  const stylesErrAuth = cn(styles.errAuth, { [styles.errAuthActive]: errAuth })
  const stylesErrAuthContainerBgdRed = cn(styles.errAuthContainer, {
    [styles.errAuthContainerBgdRed]: errAuth,
  })
  return { stylesSort, stylesErrAuth, stylesErrAuthContainerBgdRed }
}
export default SStocksStylesControllers
