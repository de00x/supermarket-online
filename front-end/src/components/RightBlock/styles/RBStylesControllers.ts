import { IRBSControllersProps, IRBStylesControllProps } from '../types/RightBlock.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const RBStylesControllers = ({ isAuth }: IRBStylesControllProps): IRBSControllersProps => {
  const stylesPersonalContainer = cn(styles.personalContainer, {
    [styles.personalContainerOff]: isAuth,
  })
  const stylesLoginOffRightBlock = cn({
    [styles.loginOffRightBlock]: localStorage.getItem('login') === null,
  })
  return { stylesPersonalContainer, stylesLoginOffRightBlock }
}
export default RBStylesControllers
