import { IInputPasswordProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputOldPass: FC<IInputPasswordProps> = ({
  setRequestChangedPassword,
  requestChangedPassword,
}): JSX.Element => {
  return (
    <input
      onChange={(e) =>
        setRequestChangedPassword({
          ...requestChangedPassword,
          oldPassword: e.target.value,
        })
      }
      placeholder={requestChangedPassword.oldPassword}
      type="password"
    />
  )
}
