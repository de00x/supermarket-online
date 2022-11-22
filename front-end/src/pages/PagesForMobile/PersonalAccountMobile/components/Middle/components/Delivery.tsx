import { ReactComponent as DeliveryIcon } from '../img/deliveryIcon.svg'
import { FC, useEffect, useState } from 'react'
import { IAllDeliveryAddress } from '../types'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const Delivery: FC = (): JSX.Element => {
  const [newAddressSuccessAddedText, setNewAddressSuccessAddedText] = useState(false)
  const [newAddressErrorAddedText, setNewAddressErrorAddedText] = useState(false)
  const [addressEditedSuccessText, setAddressEditedSuccessText] = useState(false)
  const [editedAddressContainer, setEditedAddressContainer] = useState(false)
  const [errAddNewAddressLength, setErrAddNewAddressLength] = useState(false)
  const [currentNumberInAddress, setCurrentNumberInAddress] = useState('')
  const [addNewAddressInput, setAddNewAddressInput] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [stateNewAddressInput, setStateNewAddressInput] = useState({
    newAddress: '',
  })
  const [allDeliveryAddress, setAllDeliveryAddress] = useState<IAllDeliveryAddress[]>([])

  useEffect(() => {
    axios
      .get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
      )
      .then((res) => responseAllDeliveryAddress(res))
      .catch((err) => console.log('err', err))
  }, [updateState])

  /// onClick ///
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
  /// onClick ///

  /// styles ///
  const stylesAddNewAddressBtnContainer = cn(styles.addNewAddressBtnContainer, {
    [styles.addNewAddressBtnContainerActive]: addNewAddressInput || editedAddressContainer,
  })
  const stylesEditedAddressInputContainer = cn(styles.editedAddressInputContainer, {
    [styles.editedAddressInputContainerActive]: newAddressErrorAddedText,
  })
  const stylesAddNewAddressBtn = cn(styles.addNewAddressBtn, {
    [styles.addNewAddressBtnActive]: addNewAddressInput || editedAddressContainer,
  })
  const stylesAddNewAddressInputContainer = cn(styles.addNewAddressInputContainer, {
    [styles.addNewAddressInputErr]: errAddNewAddressLength,
  })
  /// styles ///

  return (
    <div className={styles.deliveryBlockContainer}>
      <div className={styles.deliveryBlockHeader}>
        <DeliveryIcon /> Информация о доставке
      </div>
      {isLoadingPage ? (
        <>
          <div className={styles.deliveryAddressText}>Loading ...</div>
          <div className={styles.deliveryAddressText}>Loading ...</div>
          <div className={styles.deliveryAddressText}>Loading ...</div>
        </>
      ) : (
        <>
          {allDeliveryAddress.map((address) => (
            <div key={address.numberInAddress}>
              <div className={styles.deliveryAddressText}>{address.deliveryAddress}</div>
              <div className={styles.deliveryAddressChange}>
                <div
                  onClick={() =>
                    openInputEditCurrentAddress(address.numberInAddress, address.deliveryAddress)
                  }
                >
                  Изменить адрес
                </div>
                <div onClick={() => removeCurrentAddress(address.numberInAddress)}>
                  Удалить адрес
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {addNewAddressInput ? (
        <div className={stylesAddNewAddressInputContainer}>
          <input
            value={stateNewAddressInput.newAddress}
            onChange={(e) =>
              setStateNewAddressInput({
                ...stateNewAddressInput,
                newAddress: e.target.value,
              })
            }
            placeholder="Введите новый адрес"
          />
        </div>
      ) : null}
      {editedAddressContainer ? (
        <div className={stylesEditedAddressInputContainer}>
          <input
            value={stateNewAddressInput.newAddress}
            onChange={(e) =>
              setStateNewAddressInput({
                ...stateNewAddressInput,
                newAddress: e.target.value,
              })
            }
            placeholder="Введите изменения"
          />
        </div>
      ) : null}
      {errAddNewAddressLength || newAddressErrorAddedText ? (
        <div className={styles.errAddNewAddressLength}>Минимальное количество символов - 10.</div>
      ) : null}
      {newAddressSuccessAddedText ? (
        <div className={styles.newAddressSuccessAddedText}>Вы успешно добавили новый адрес.</div>
      ) : null}
      {addressEditedSuccessText ? (
        <div className={styles.newAddressSuccessAddedText}>Адрес был успешно изменен.</div>
      ) : null}
      <div className={stylesAddNewAddressBtnContainer}>
        {!editedAddressContainer ? (
          <div onClick={openInputAddNewAddress} className={stylesAddNewAddressBtn}>
            Добавить новый адрес
          </div>
        ) : null}
        {editedAddressContainer ? (
          <div onClick={editeCurrentAddress} className={stylesAddNewAddressBtn}>
            Сохранить изменения
          </div>
        ) : null}
        {addNewAddressInput || editedAddressContainer ? (
          <div onClick={closeInputAddNewAddress} className={styles.addNewAddressBtn}>
            Отменить изменения
          </div>
        ) : null}
      </div>
    </div>
  )
}
