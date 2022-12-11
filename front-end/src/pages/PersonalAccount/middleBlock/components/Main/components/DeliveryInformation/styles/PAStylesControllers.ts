import { IPAStylesCProps } from '../types/PAccount.types'
import styles from '../../../styles/styles.module.scss'
import cn from 'classnames'

const PAStylesControllers = ({
  editedAddressContainer,
  newAddressErrorAddedText,
  addedNewAddressContainer,
}: IPAStylesCProps) => {
  const stylesDeliveryAddNewAddressText = cn(styles.deliveryAddNewAddressText, {
    [styles.deliveryAddNewAddressTextActive]: addedNewAddressContainer || editedAddressContainer,
  })
  const stylesAddedNewAddressContainer = cn(styles.addedNewAddressContainer, {
    [styles.addedNewAddressContainerRedUnderline]: newAddressErrorAddedText,
  })
  const stylesDeliveryAddNewAddressContainer = cn(styles.deliveryAddNewAddressContainer, {
    [styles.deliveryAddNewAddressContainerActive]:
      addedNewAddressContainer || editedAddressContainer,
  })
  return {
    stylesDeliveryAddNewAddressText,
    stylesAddedNewAddressContainer,
    stylesDeliveryAddNewAddressContainer,
  }
}
export default PAStylesControllers
