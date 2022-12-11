import { IInputPersDataProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputLastName: FC<IInputPersDataProps> = ({
  changedInfoData,
  setChangedInfoData,
}): JSX.Element => {
  return (
    <input
      value={changedInfoData.name}
      onChange={(e) =>
        setChangedInfoData({
          ...changedInfoData,
          name: e.target.value,
        })
      }
      placeholder="Фамилия"
    />
  )
}
