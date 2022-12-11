import { ReactComponent as DeliveryIcon } from '../../img/deliveryIcon.svg'
import { FC, useState } from 'react'
import { IAllDeliveryAddress } from '../../types/PAccountM.types'
import styles from '../../styles/styles.module.scss'
import DeliveryMControllers from './services/DeliveryMControllers'
import DeliveryMService from './services/DeliveryM.service'
import DelMStylesControllers from './styles/DelMStylesControllers'
import { InputNewAddress } from './inputs/InputNewAddress/InputNewAddress'
import { InputChangeAddress } from './inputs'

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

  /// controllers ///
  const {
    editeCurrentAddress,
    removeCurrentAddress,
    openInputAddNewAddress,
    closeInputAddNewAddress,
    responseAllDeliveryAddress,
    openInputEditCurrentAddress,
  } = DeliveryMControllers({
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
  })
  /// controllers ///

  /// useEffects ///
  DeliveryMService.GetCurrentUserID(responseAllDeliveryAddress, updateState)
  /// useEffects ///

  /// styles ///
  const {
    stylesAddNewAddressBtn,
    stylesAddNewAddressBtnContainer,
    stylesEditedAddressInputContainer,
    stylesAddNewAddressInputContainer,
  } = DelMStylesControllers({
    addNewAddressInput,
    editedAddressContainer,
    errAddNewAddressLength,
    newAddressErrorAddedText,
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
        <InputNewAddress
          stateNewAddressInput={stateNewAddressInput}
          setStateNewAddressInput={setStateNewAddressInput}
          stylesAddNewAddressInputContainer={stylesAddNewAddressInputContainer}
        />
      ) : null}
      {editedAddressContainer ? (
        <InputChangeAddress
          stateNewAddressInput={stateNewAddressInput}
          setStateNewAddressInput={setStateNewAddressInput}
          stylesEditedAddressInputContainer={stylesEditedAddressInputContainer}
        />
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
