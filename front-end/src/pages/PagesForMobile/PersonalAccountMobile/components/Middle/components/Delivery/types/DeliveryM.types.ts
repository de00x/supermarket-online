import { IAllDeliveryAddress } from '../../../types/PAccountM.types'

interface IDelMSControllersProps {
  addNewAddressInput: boolean
  editedAddressContainer: boolean
  errAddNewAddressLength: boolean
  newAddressErrorAddedText: boolean
}
interface IInputNewAddressProps {
  stylesAddNewAddressInputContainer: string
  stateNewAddressInput: {
    newAddress: string
  }
  setStateNewAddressInput: React.Dispatch<
    React.SetStateAction<{
      newAddress: string
    }>
  >
}
interface IInputChangeAddressProps {
  stylesEditedAddressInputContainer: string
  stateNewAddressInput: {
    newAddress: string
  }
  setStateNewAddressInput: React.Dispatch<
    React.SetStateAction<{
      newAddress: string
    }>
  >
}
interface IDelMControllersProps {
  updateState: boolean
  addNewAddressInput: boolean
  currentNumberInAddress: string
  setUpdateState: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
  setAddNewAddressInput: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentNumberInAddress: React.Dispatch<React.SetStateAction<string>>
  setEditedAddressContainer: React.Dispatch<React.SetStateAction<boolean>>
  setErrAddNewAddressLength: React.Dispatch<React.SetStateAction<boolean>>
  setAddressEditedSuccessText: React.Dispatch<React.SetStateAction<boolean>>
  setNewAddressErrorAddedText: React.Dispatch<React.SetStateAction<boolean>>
  setNewAddressSuccessAddedText: React.Dispatch<React.SetStateAction<boolean>>
  setAllDeliveryAddress: React.Dispatch<React.SetStateAction<IAllDeliveryAddress[]>>
  stateNewAddressInput: {
    newAddress: string
  }
  setStateNewAddressInput: React.Dispatch<
    React.SetStateAction<{
      newAddress: string
    }>
  >
}
export type {
  IDelMControllersProps,
  IInputNewAddressProps,
  IDelMSControllersProps,
  IInputChangeAddressProps,
}
