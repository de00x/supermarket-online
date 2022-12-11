import { IInputPersDataProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputName: FC<IInputPersDataProps> = ({
  changedInfoData,
  setChangedInfoData,
}): JSX.Element => {
  return (
    <input
      value={changedInfoData.lastName}
      onChange={(e) =>
        setChangedInfoData({
          ...changedInfoData,
          lastName: e.target.value,
        })
      }
      placeholder="Имя"
    />
  )
}
