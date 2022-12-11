import { IDelMSControllersProps } from '../types/DeliveryM.types'
import styles from '../../../styles/styles.module.scss'
import cn from 'classnames'

const DelMStylesControllers = ({
  addNewAddressInput,
  editedAddressContainer,
  errAddNewAddressLength,
  newAddressErrorAddedText,
}: IDelMSControllersProps) => {
  const stylesAddNewAddressBtnContainer = cn(styles.addNewAddressBtnContainer, {
    [styles.addNewAddressBtnContainerActive]: addNewAddressInput || editedAddressContainer,
  })
  const stylesEditedAddressInputContainer = cn(styles.editedAddressInputContainer, {
    [styles.editedAddressInputContainerActive]: newAddressErrorAddedText,
  })
  const stylesAddNewAddressBtn = cn(styles.addNewAddressBtn, {
    [styles.addNewAddressBtnActive]: addNewAddressInput || editedAddressContainer,
  })
  const stylesAddNewAddressInputContainer = cn(styles.addNewAddressInputContainer, {
    [styles.addNewAddressInputErr]: errAddNewAddressLength,
  })
  return {
    stylesAddNewAddressBtn,
    stylesAddNewAddressBtnContainer,
    stylesEditedAddressInputContainer,
    stylesAddNewAddressInputContainer,
  }
}
export default DelMStylesControllers
