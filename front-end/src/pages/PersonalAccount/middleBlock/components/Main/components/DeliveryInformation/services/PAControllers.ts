import { IPAControllersProps } from '../types/PAccount.types'
import axios, { AxiosResponse } from 'axios'

const PAControllers = ({
  setIsLoadingPage,
  stateNewAddressInput,
  setAllDeliveryAddress,
  currentNumberInAddress,
  setStateNewAddressInput,
  addedNewAddressContainer,
  responseSuccessNewAddress,
  setEditedAddressContainer,
  setCurrentNumberInAddress,
  setAddedNewAddressContainer,
  setNewAddressErrorAddedText,
  setAddressEditedSuccessText,
  setResponseSuccessNewAddress,
  setNewAddressSuccessAddedText,
}: IPAControllersProps) => {
  const responseSuccessCreateNewAddress = (res: AxiosResponse): void => {
    if (res.data.success === true) {
      setResponseSuccessNewAddress(!responseSuccessNewAddress)
      setNewAddressSuccessAddedText(true)
      setAddedNewAddressContainer(false)
      setStateNewAddressInput({ ...stateNewAddressInput, newAddress: '' })
      setTimeout(() => {
        setNewAddressSuccessAddedText(false)
      }, 5000)
    } else alert('responseSuccessCreateNewAddress / res.data.success === false')
  }
  const removeCurrentAddress = (numberInAddress: string): void => {
    axios
      .delete(`/delete-user-address/?numberInAddress=${numberInAddress}`)
      .then((res) => responseSuccessRemoveAddress(res))
      .catch((err) => console.log('err', err))
  }
  const responseSuccessRemoveAddress = (res: AxiosResponse): void => {
    if (res.data.success === true) {
      axios
        .get(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
        )
        .then((res) => responseAllDeliveryAddress(res))
        .catch((err) => console.log('err', err))
    } else alert('responseSuccessRemoveAddress / res.data.success === false')
  }
  const responseAllDeliveryAddress = (res: AxiosResponse): void => {
    setAllDeliveryAddress(res.data)
    setIsLoadingPage(false)
  }
  const responseSuccessEditAddress = (res: AxiosResponse): void => {
    if (res.data.success === true) {
      axios
        .get(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
        )
        .then((res) => responseAllDeliveryAddress(res))
        .catch((err) => console.log('err', err))
      setEditedAddressContainer(false)
      setStateNewAddressInput({ ...stateNewAddressInput, newAddress: '' })
      setAddressEditedSuccessText(true)
      setTimeout(() => {
        setAddressEditedSuccessText(false)
      }, 5000)
    } else alert('responseSuccessEditAddress / res.data.success === false')
  }
  const editeCurrentAddress = (): void => {
    if (stateNewAddressInput.newAddress.length > 9) {
      axios
        .put('/edit-delivery-address', {
          id: localStorage.getItem('id'),
          numberInAddress: currentNumberInAddress,
          editedDeliveryAddress: stateNewAddressInput.newAddress,
        })
        .then((res) => responseSuccessEditAddress(res))
        .catch((err) => console.log('err', err))
    } else {
      setNewAddressErrorAddedText(true)
      setTimeout(() => {
        setNewAddressErrorAddedText(false)
      }, 5000)
    }
  }
  const onCancelNewAddress = (): void => {
    setAddedNewAddressContainer(false)
    setEditedAddressContainer(false)
    setStateNewAddressInput({ ...stateNewAddressInput, newAddress: '' })
  }
  const onAddNewAddress = (): void => {
    if (addedNewAddressContainer) {
      if (stateNewAddressInput.newAddress.length > 9) {
        axios
          .post('/create-delivery-address', {
            id: localStorage.getItem('id'),
            newAddress: stateNewAddressInput.newAddress,
          })
          .then((res) => responseSuccessCreateNewAddress(res))
          .catch((err) => console.log('err', err))
      } else {
        setNewAddressErrorAddedText(true)
        setTimeout(() => {
          setNewAddressErrorAddedText(false)
        }, 5000)
      }
    } else setAddedNewAddressContainer(true)
  }
  const openInputEditCurrentAddress = (numberInAddress: string, deliveryAddress: string): void => {
    setStateNewAddressInput({
      ...stateNewAddressInput,
      newAddress: deliveryAddress,
    })
    setEditedAddressContainer(true)
    setCurrentNumberInAddress(numberInAddress)
  }
  return {
    onAddNewAddress,
    onCancelNewAddress,
    editeCurrentAddress,
    removeCurrentAddress,
    responseAllDeliveryAddress,
    openInputEditCurrentAddress,
  }
}
export default PAControllers
