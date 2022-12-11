import { Dispatch } from 'react'

interface ILSControllersProps {
  valueFinalyInputDelete: string
  finalyConfirmationDeleteAcc: boolean
}
interface ILControllersProps {
  valueFinalyInputDelete: string
  setDeleteAccBtn: Dispatch<React.SetStateAction<boolean>>
  setFinalyConfirmationDeleteAcc: Dispatch<React.SetStateAction<boolean>>
}

export type { ILSControllersProps, ILControllersProps }
