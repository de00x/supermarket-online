import { IDataLoginInputProps } from '../types/types'
import { FC } from 'react'

export const DataPassInput: FC<IDataLoginInputProps> = ({ userData, setUserData }): JSX.Element => {
  return (
    <input
      placeholder="Пароль"
      value={userData.password}
      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      type="password"
    ></input>
  )
}
