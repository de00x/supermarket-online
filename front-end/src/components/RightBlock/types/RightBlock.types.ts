// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
interface IRBStylesControllProps {
  isAuth: boolean
}
interface IRBSControllersProps {
  stylesPersonalContainer: string
  stylesLoginOffRightBlock: string
}
interface IRBControllersOutProps {
  logOutFromAccount: () => void
  logOutCancel: () => void
  logOutYes: () => void
  isAuth: boolean
}
interface IRBControllersProps {
  setConfirmationOutAccount: Dispatch<React.SetStateAction<boolean>>
  dispatch: Dispatch<AnyAction>
}
export type {
  IRBControllersProps,
  IRBSControllersProps,
  IRBStylesControllProps,
  IRBControllersOutProps,
}
