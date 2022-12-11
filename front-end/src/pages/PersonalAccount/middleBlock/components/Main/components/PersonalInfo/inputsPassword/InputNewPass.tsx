import { IInputPasswordProps } from '../types/PersonalI.types'
import { FC } from 'react'

export const InputNewPass: FC<IInputPasswordProps> = ({
  setRequestChangedPassword,
  requestChangedPassword,
}): JSX.Element => {
  return (
    <input
      onChange={(e) =>
        setRequestChangedPassword({
          ...requestChangedPassword,
          newPassword: e.target.value,
        })
      }
      placeholder={requestChangedPassword.newPassword}
      type="password"
    />
  )
}
