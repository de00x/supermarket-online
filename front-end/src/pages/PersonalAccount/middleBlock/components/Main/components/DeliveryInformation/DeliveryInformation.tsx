import { ReactComponent as DeliveryIcon } from '../../img/deliveryIcon.svg'
import { InputChangeNewAddress, InputNewAddress } from './inputs'
import { IAllDeliveryAddress } from './types/PAccount.types'
import { FC, useState } from 'react'
import styles from '../../styles/styles.module.scss'
import PAControllers from './services/PAControllers'
import PAccountService from './services/PAccount.service'
import PAStylesControllers from './styles/PAStylesControllers'

export const DeliveryInformation: FC = () => {
  const [allDeliveryAddress, setAllDeliveryAddress] = useState<IAllDeliveryAddress[]>([])
  const [newAddressSuccessAddedText, setNewAddressSuccessAddedText] = useState(false)
  const [responseSuccessNewAddress, setResponseSuccessNewAddress] = useState(false)
  const [addedNewAddressContainer, setAddedNewAddressContainer] = useState(false)
  const [addressEditedSuccessText, setAddressEditedSuccessText] = useState(false)
  const [newAddressErrorAddedText, setNewAddressErrorAddedText] = useState(false)
  const [editedAddressContainer, setEditedAddressContainer] = useState(false)
  const [currentNumberInAddress, setCurrentNumberInAddress] = useState('')
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [stateNewAddressInput, setStateNewAddressInput] = useState({
    newAddress: '',
  })

  /// functions ///
  const {
    onAddNewAddress,
    onCancelNewAddress,
    editeCurrentAddress,
    removeCurrentAddress,
    responseAllDeliveryAddress,
    openInputEditCurrentAddress,
  } = PAControllers({
    setIsLoadingPage,
    stateNewAddressInput,
    setAllDeliveryAddress,
    currentNumberInAddress,
    setStateNewAddressInput,
    addedNewAddressContainer,
    responseSuccessNewAddress,
    setEditedAddressContainer,
    setCurrentNumberInAddress,
    setAddressEditedSuccessText,
    setNewAddressErrorAddedText,
    setAddedNewAddressContainer,
    setResponseSuccessNewAddress,
    setNewAddressSuccessAddedText,
  })
  /// functions ///

  /// useEffects ///
  PAccountService.GetAllDeliveryAddress(responseAllDeliveryAddress, responseSuccessNewAddress)
  /// useEffects ///

  /// styles ///
  const {
    stylesAddedNewAddressContainer,
    stylesDeliveryAddNewAddressText,
    stylesDeliveryAddNewAddressContainer,
  } = PAStylesControllers({
    editedAddressContainer,
    addedNewAddressContainer,
    newAddressErrorAddedText,
  })
  /// styles ///

  return (
    <div className={styles.deliveryBlockContainer}>
      <div className={styles.deliveryBlock}>
        <div className={styles.deliveryBlockHeader}>
          <DeliveryIcon /> ???????????????????? ?? ????????????????
        </div>
        {isLoadingPage ? (
          <>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>???????????????? ??????????</div>
              <div>?????????????? ??????????</div>
            </div>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>???????????????? ??????????</div>
              <div>?????????????? ??????????</div>
            </div>
            <div className={styles.deliveryInfoText}>Loading ...</div>
            <div className={styles.deliveryInfoChange}>
              <div>???????????????? ??????????</div>
              <div>?????????????? ??????????</div>
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
                      ???????????????? ??????????
                    </div>
                    {!editedAddressContainer ? (
                      <div onClick={() => removeCurrentAddress(address.numberInAddress)}>
                        ?????????????? ??????????
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
            <InputNewAddress
              stateNewAddressInput={stateNewAddressInput}
              setStateNewAddressInput={setStateNewAddressInput}
            />
          </div>
        ) : null}
        {editedAddressContainer ? (
          <div className={styles.editedAddressContainer}>
            <InputChangeNewAddress
              stateNewAddressInput={stateNewAddressInput}
              setStateNewAddressInput={setStateNewAddressInput}
            />
          </div>
        ) : null}
        {newAddressSuccessAddedText ? (
          <div className={styles.newAddressSuccessAddedText}>?????????? ?????????? ?????????????? ????????????????</div>
        ) : null}
        {addressEditedSuccessText ? (
          <div className={styles.newAddressSuccessAddedText}>?????????? ?????? ?????????????? ??????????????</div>
        ) : null}
        {newAddressErrorAddedText ? (
          <div className={styles.errAddNewAddressLengthSymbols}>
            ?????????????????????? ???????????????????? ???????????????? - 10
          </div>
        ) : null}
        <div className={stylesDeliveryAddNewAddressContainer}>
          {editedAddressContainer ? (
            <div onClick={editeCurrentAddress} className={stylesDeliveryAddNewAddressText}>
              ?????????????????? ??????????????????
            </div>
          ) : (
            <div onClick={onAddNewAddress} className={stylesDeliveryAddNewAddressText}>
              ???????????????? ?????????? ??????????
            </div>
          )}
          {addedNewAddressContainer || editedAddressContainer ? (
            <div onClick={onCancelNewAddress} className={styles.deliveryCancelNewAddressText}>
              ???????????????? ??????????????????
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
