import { IRegSControllerProps } from '../types/Registered.types'
import styles from '../styles/styles.module.scss'
import cn from 'classnames'

const RegStylesController = ({ incorrectInputData }: IRegSControllerProps) => {
  const stylesFormInput = cn(styles.formInput, {
    [styles.inputErrData]: incorrectInputData,
  })
  return { stylesFormInput }
}
export default RegStylesController
