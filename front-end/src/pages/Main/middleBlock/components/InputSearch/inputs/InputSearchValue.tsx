import { FC } from 'react'
import { IInputSearchVProps } from '../types/types'

export const InputSearchValue: FC<IInputSearchVProps> = ({
  inputRef,
  searchValue,
  setFlySearch,
  setSearchValue,
  stylesInputForm,
}): JSX.Element => {
  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onClick={() => setFlySearch(true)}
      className={stylesInputForm}
      placeholder="Глобальный поиск"
      ref={inputRef}
    ></input>
  )
}
