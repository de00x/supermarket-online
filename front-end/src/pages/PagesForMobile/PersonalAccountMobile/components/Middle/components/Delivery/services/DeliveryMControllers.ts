import { IDelMControllersProps } from '../types/DeliveryM.types'
import axios, { AxiosResponse } from 'axios'

const DeliveryMControllers = ({
  updateState,
  setUpdateState,
  setIsLoadingPage,
  addNewAddressInput,
  stateNewAddressInput,
  setAddNewAddressInput,
  setAllDeliveryAddress,
  currentNumberInAddress,
  setStateNewAddressInput,
  setEditedAddressContainer,
  setErrAddNewAddressLength,
  setCurrentNumberInAddress,
  setAddressEditedSuccessText,
  setNewAddressErrorAddedText,
  setNewAddressSuccessAddedText,
}: IDelMControllersProps) => {
  const responseAllDeliveryAddress = (res: AxiosResponse): void => {
    setAllDeliveryAddress(res.data)
    setIsLoadingPage(false)
  }
  const responseSuccessCreateNewAddress = (res: AxiosResponse): void => {
    if (res.data.success === true) {
      setUpdateState(!updateState)
      setNewAddressSuccessAddedText(true)
      setAddNewAddressInput(false)
      setStateNewAddressInput({ ...stateNewAddressInput, newAddress: '' })
      setTimeout(() => {
        setNewAddressSuccessAddedText(false)
      }, 5000)
    } else alert('responseSuccessCreateNewAddress / res.data.success === false')
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
  const openInputAddNewAddress = (): void => {
    if (addNewAddressInput) {
      if (stateNewAddressInput.newAddress.length > 9) {
        axios
          .post('/create-delivery-address', {
            id: localStorage.getItem('id'),
            newAddress: stateNewAddressInput.newAddress,
          })
          .then((res) => responseSuccessCreateNewAddress(res))
          .catch((err) => console.log('err', err))
      } else {
        setErrAddNewAddressLength(true)
        setTimeout(() => {
          setErrAddNewAddressLength(false)
        }, 5000)
      }
    } else setAddNewAddressInput(true)
  }
  const closeInputAddNewAddress = (): void => {
    setAddNewAddressInput(false)
    setEditedAddressContainer(false)
    setStateNewAddressInput({
      ...stateNewAddressInput,
      newAddress: '',
    })
  }
  const openInputEditCurrentAddress = (numberInAddress: string, deliveryAddress: string): void => {
    setStateNewAddressInput({
      ...stateNewAddressInput,
      newAddress: deliveryAddress,
    })
    setEditedAddressContainer(true)
    setCurrentNumberInAddress(numberInAddress)
  }
  const removeCurrentAddress = (numberInAddress: string): void => {
    axios
      .delete(`/delete-user-address/?numberInAddress=${numberInAddress}`)
      .then((res) => responseSuccessRemoveAddress(res))
      .catch((err) => console.log('err', err))
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
  return {
    editeCurrentAddress,
    removeCurrentAddress,
    openInputAddNewAddress,
    closeInputAddNewAddress,
    responseAllDeliveryAddress,
    openInputEditCurrentAddress,
  }
}
export default DeliveryMControllers
