import { ReactComponent as DeliveryIcon } from '../img/deliveryIcon.svg'
import { FC, useEffect, useState } from 'react'
import { IAllDeliveryAddress } from './types'
import axios, { AxiosResponse } from 'axios'
import cn from 'classnames'
import styles from '../styles.module.scss'

export const DeliveryInformation: FC = () => {
  const [editedAddressContainer, setEditedAddressContainer] = useState(false)
  const [currentNumberInAddress, setCurrentNumberInAddress] = useState('')
  const [newAddressSuccessAddedText, setNewAddressSuccessAddedText] = useState(false)
  const [responseSuccessNewAddress, setResponseSuccessNewAddress] = useState(false)
  const [addedNewAddressContainer, setAddedNewAddressContainer] = useState(false)
  const [addressEditedSuccessText, setAddressEditedSuccessText] = useState(false)
  const [newAddressErrorAddedText, setNewAddressErrorAddedText] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [allDeliveryAddress, setAllDeliveryAddress] = useState<IAllDeliveryAddress[]>([])
  const [stateNewAddressInput, setStateNewAddressInput] = useState({
    newAddress: '',
  })

  useEffect(() => {
    axios
      .get(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
      )
      .then((res) => responseAllDeliveryAddress(res))
      .catch((err) => console.log('err', err))
  }, [responseSuccessNewAddress])

  /// onClick ///
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
  /// onClick ///

  /// styles ///
  const stylesDeliveryAddNewAddressText = cn(styles.deliveryAddNewAddressText, {
    [styles.deliveryAddNewAddressTextActive]: addedNewAddressContainer || editedAddressContainer,
  })
  const stylesAddedNewAddressContainer = cn(styles.addedNewAddressContainer, {
    [styles.addedNewAddressContainerRedUnderline]: newAddressErrorAddedText,
  })
  const stylesDeliveryAddNewAddressContainer = cn(styles.deliveryAddNewAddressContainer, {
    [styles.deliveryAddNewAddressContainerActive]:
      addedNewAddressContainer || editedAddressContainer,
  })
  /// styles ///

  return (
    <div className={styles.deliveryBlockContainer}>
      <div className={styles.deliveryBlock}>
        <div className={styles.deliveryBlockHeader}>
          <DeliveryIcon /> Информация о доставке
        </div>
        {isLoadingPage ? (
          <>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>Изменить адрес</div>
              <div>Удалить адрес</div>
            </div>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>Изменить адрес</div>
              <div>Удалить адрес</div>
            </div>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>Изменить адрес</div>
              <div>Удалить адрес</div>
            </div>
          </>
        ) : (
          <>
            {allDeliveryAddress.map((address) => (
              <div key={address.numberInAddress}>
                <div className={styles.deliveryInfoText}>{address.deliveryAddress}</div>
                {!addedNewAddressContainer ? (
                  <div className={styles.deliveryInfoChange}>
                    <div
                      onClick={() =>
                        openInputEditCurrentAddress(
                          address.numberInAddress,
                          address.deliveryAddress
                        )
                      }
                    >
                      Изменить адрес
                    </div>
                    {!editedAddressContainer ? (
                      <div onClick={() => removeCurrentAddress(address.numberInAddress)}>
                        Удалить адрес
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </>
        )}
        {addedNewAddressContainer ? (
          <div className={stylesAddedNewAddressContainer}>
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
          <div className={styles.editedAddressContainer}>
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
        {newAddressSuccessAddedText ? (
          <div className={styles.newAddressSuccessAddedText}>Новый адрес успешно добавлен</div>
        ) : null}
        {addressEditedSuccessText ? (
          <div className={styles.newAddressSuccessAddedText}>Адрес был успешно изменен</div>
        ) : null}
        {newAddressErrorAddedText ? (
          <div className={styles.errAddNewAddressLengthSymbols}>
            Минимальное количество символов - 10
          </div>
        ) : null}
        <div className={stylesDeliveryAddNewAddressContainer}>
          {editedAddressContainer ? (
            <div onClick={editeCurrentAddress} className={stylesDeliveryAddNewAddressText}>
              Сохранить изменения
            </div>
          ) : (
            <div onClick={onAddNewAddress} className={stylesDeliveryAddNewAddressText}>
              Добавить новый адрес
            </div>
          )}
          {addedNewAddressContainer || editedAddressContainer ? (
            <div onClick={onCancelNewAddress} className={styles.deliveryCancelNewAddressText}>
              Отменить изменения
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
