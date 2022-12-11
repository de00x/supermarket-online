import { IInputNewAddressProps } from '../types/PAccount.types'
import { FC } from 'react'

export const InputChangeNewAddress: FC<IInputNewAddressProps> = ({
  stateNewAddressInput,
  setStateNewAddressInput,
}): JSX.Element => {
  return (
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
  )
}
