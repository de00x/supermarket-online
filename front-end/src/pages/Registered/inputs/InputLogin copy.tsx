import { IUserDataInputsProps } from '../types/Registered.types'
import { FC } from 'react'

export const InputPassword: FC<IUserDataInputsProps> = ({
  userData,
  setUserData,
  stylesFormInput,
}): JSX.Element => {
  return (
    <div className={stylesFormInput}>
      <input
        placeholder="Пароль"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        type="password"
      ></input>
    </div>
  )
}
