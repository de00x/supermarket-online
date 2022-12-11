import { FC } from 'react'
import { IUserDataInputsProps } from '../types/Registered.types'

export const InputLogin: FC<IUserDataInputsProps> = ({
  userData,
  setUserData,
  stylesFormInput,
}): JSX.Element => {
  return (
    <div className={stylesFormInput}>
      <input
        placeholder="Логин"
        value={userData.login}
        onChange={(e) => setUserData({ ...userData, login: e.target.value })}
        type="login"
      />
    </div>
  )
}
