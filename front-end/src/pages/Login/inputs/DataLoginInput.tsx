import { IDataLoginInputProps } from '../types/types'
import { FC } from 'react'

export const DataLoginInput: FC<IDataLoginInputProps> = ({
  userData,
  setUserData,
}): JSX.Element => {
  return (
    <input
      placeholder="Логин"
      value={userData.login}
      onChange={(e) => setUserData({ ...userData, login: e.target.value })}
      type="login"
    ></input>
  )
}
