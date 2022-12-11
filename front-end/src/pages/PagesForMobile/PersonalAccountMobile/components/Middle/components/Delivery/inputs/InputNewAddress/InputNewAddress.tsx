import { IInputNewAddressProps } from '../../types/DeliveryM.types'
import { FC } from 'react'

export const InputNewAddress: FC<IInputNewAddressProps> = ({
  stateNewAddressInput,
  setStateNewAddressInput,
  stylesAddNewAddressInputContainer,
}) => {
  return (
    <div className={stylesAddNewAddressInputContainer}>
      <input
        value={stateNewAddressInput.newAddress}
        onChange={(e) =>
          setStateNewAddressInput({
            ...stateNewAddressInput,
            newAddress: e.target.value,
          })
        }
        placeholder="Введите новый адрес"
      />
    </div>
  )
}
