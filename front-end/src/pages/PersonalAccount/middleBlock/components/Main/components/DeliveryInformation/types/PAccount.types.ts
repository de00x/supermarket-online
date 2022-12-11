import { Dispatch, SetStateAction } from 'react'

interface IPAControllersProps {
  stateNewAddressInput: {
    newAddress: string
  }
  setStateNewAddressInput: Dispatch<
    React.SetStateAction<{
      newAddress: string
    }>
  >
  currentNumberInAddress: string
  addedNewAddressContainer: boolean
  responseSuccessNewAddress: boolean
  setIsLoadingPage: Dispatch<SetStateAction<boolean>>
  setEditedAddressContainer: Dispatch<SetStateAction<boolean>>
  setAddedNewAddressContainer: Dispatch<SetStateAction<boolean>>
  setAddressEditedSuccessText: Dispatch<SetStateAction<boolean>>
  setNewAddressErrorAddedText: Dispatch<SetStateAction<boolean>>
  setResponseSuccessNewAddress: Dispatch<SetStateAction<boolean>>
  setNewAddressSuccessAddedText: Dispatch<SetStateAction<boolean>>
  setAllDeliveryAddress: Dispatch<SetStateAction<IAllDeliveryAddress[]>>
  setCurrentNumberInAddress: React.Dispatch<React.SetStateAction<string>>
}
interface IAllDeliveryAddress {
  id: string
  deliveryAddress: string
  numberInAddress: string
}
interface IPAStylesCProps {
  editedAddressContainer: boolean
  newAddressErrorAddedText: boolean
  addedNewAddressContainer: boolean
}
interface IInputNewAddressProps {
  setStateNewAddressInput: React.Dispatch<
    React.SetStateAction<{
      newAddress: string
    }>
  >
  stateNewAddressInput: {
    newAddress: string
  }
}

export type { IPAControllersProps, IPAStylesCProps, IInputNewAddressProps, IAllDeliveryAddress }
