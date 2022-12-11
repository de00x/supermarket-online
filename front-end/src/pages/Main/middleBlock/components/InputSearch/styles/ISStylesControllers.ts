import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const ISStylesControllers = (flySearch: boolean) => {
  const stylesInputForm = cn(styles.inputForm, {
    [styles.inputFormActive]: flySearch,
  })
  return { stylesInputForm }
}
export default ISStylesControllers
