import { IIPersDataEmailProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputTelephone: FC<IIPersDataEmailProps> = ({
  changedInfoData,
  setChangedInfoData,
  stylesInputsChangesEmailTel,
}): JSX.Element => {
  return (
    <input
      value={changedInfoData.telefone}
      onChange={(e) =>
        setChangedInfoData({
          ...changedInfoData,
          telefone: e.target.value,
        })
      }
      className={stylesInputsChangesEmailTel}
      placeholder="Телефон"
    />
  )
}
