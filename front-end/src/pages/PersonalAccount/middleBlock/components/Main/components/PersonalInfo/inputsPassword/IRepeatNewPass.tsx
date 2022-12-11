import { IInputPasswordProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const IRepeatNewPass: FC<IInputPasswordProps> = ({
  setRequestChangedPassword,
  requestChangedPassword,
}): JSX.Element => {
  return (
    <input
      onChange={(e) =>
        setRequestChangedPassword({
          ...requestChangedPassword,
          repeatNewPassword: e.target.value,
        })
      }
      placeholder={requestChangedPassword.repeatNewPassword}
      type="password"
    />
  )
}
