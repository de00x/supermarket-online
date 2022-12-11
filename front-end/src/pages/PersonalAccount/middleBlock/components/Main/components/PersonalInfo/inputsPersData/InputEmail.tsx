import { IIPersDataEmailProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputEmail: FC<IIPersDataEmailProps> = ({
  changedInfoData,
  setChangedInfoData,
  stylesInputsChangesEmailTel,
}): JSX.Element => {
  return (
    <input
      value={changedInfoData.email}
      onChange={(e) =>
        setChangedInfoData({
          ...changedInfoData,
          email: e.target.value,
        })
      }
      className={stylesInputsChangesEmailTel}
      placeholder="Email"
    />
  )
}
