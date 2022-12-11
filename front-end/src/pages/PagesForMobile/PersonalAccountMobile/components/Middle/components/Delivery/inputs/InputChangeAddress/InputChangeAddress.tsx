import { IInputChangeAddressProps } from '../../types/DeliveryM.types'
import { FC } from 'react'

export const InputChangeAddress: FC<IInputChangeAddressProps> = ({
  stylesEditedAddressInputContainer,
  stateNewAddressInput,
  setStateNewAddressInput,
}) => {
  return (
    <div className={stylesEditedAddressInputContainer}>
      <input
        value={stateNewAddressInput.newAddress}
        onChange={(e) =>
          setStateNewAddressInput({
            ...stateNewAddressInput,
            newAddress: e.target.value,
          })
        }
        placeholder="Введите изменения"
      />
    </div>
  )
}
