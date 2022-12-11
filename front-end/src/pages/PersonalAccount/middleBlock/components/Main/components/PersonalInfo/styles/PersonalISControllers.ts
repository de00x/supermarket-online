import { IPISControllersProps } from '../types/PersonalI.types'
import styles from '../../../styles/styles.module.scss'
import cn from 'classnames'

const PersonalISControllers = ({
  changeNameErr,
  successDataChanged,
  changedPersonalInfo,
  newPasswordsDontMatch,
  newPasswordSuccessChanged,
  oldPasswordIncorrectedText,
}: IPISControllersProps) => {
  const stylesChangeDataContainer = cn(styles.changeDataContainer, {
    [styles.changeDataContainerActive]: changedPersonalInfo,
    [styles.changeDataContainerSuccessTextOn]: newPasswordsDontMatch,
    [styles.changeDataContainerSuccessTextOn2]: successDataChanged,
    [styles.changeDataContainerSuccessTextOn3]: oldPasswordIncorrectedText,
    [styles.changeDataContainerSuccessTextOn4]: newPasswordSuccessChanged,
  })
  const stylesInputsChangesEmailTel = cn(styles.inputChangedEmail, {
    [styles.inputsChangesEmailTelErr]: changeNameErr,
  })
  const stylesInputsChangesName = cn(styles.inputsChangedName, {
    [styles.inputsChangedNameErr]: changeNameErr,
  })
  return { stylesChangeDataContainer, stylesInputsChangesEmailTel, stylesInputsChangesName }
}
export default PersonalISControllers
