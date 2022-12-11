import { InputEmail, InputLastName, InputName, InputTelephone } from './inputsPersData'
import { InputNewPass, InputOldPass, IRepeatNewPass } from './inputsPassword'
import { IChangedInfoData, IChangedPassword } from './types/PersonalI.types'
import { ReactComponent as PersonalIcon } from '../../img/personalIcon.svg'
import PersonalIControllers from './services/PersonalIControllers'
import PersonalISControllers from './styles/PersonalISControllers'
import PersonalIService from './services/PersonalI.service'
import { FC, useState } from 'react'
import styles from '../../styles/styles.module.scss'

export const PersonalInfo: FC = (): JSX.Element => {
  const [oldPasswordIncorrectedText, setOldPasswordIncorrectedText] = useState(false)
  const [newPasswordSuccessChanged, setNewPasswordSuccessChanged] = useState(false)
  const [newPasswordsDontMatch, setNewPasswordsDontMatch] = useState(false)
  const [changedPersonalInfo, setChangedPersonalInfo] = useState(false)
  const [successDataChanged, setSuccessDataChanged] = useState(false)
  const [changedPassword, setChangedPassword] = useState(false)
  const [changeNameErr, setChangeNameErr] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [requestChangedPassword, setRequestChangedPassword] = useState<IChangedPassword>({
    oldPassword: 'Введите старый пароль',
    newPassword: 'Введите новый пароль',
    repeatNewPassword: 'Повторите новый пароль',
  })
  const [changedInfoData, setChangedInfoData] = useState<IChangedInfoData>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    telefone: '',
  })

  /// functions ///
  const {
    cancelChanges,
    changePersonalInfo,
    onChangedPasswordForm,
    onChangedPasswordRequest,
    changedResponsePersonalInfo,
  } = PersonalIControllers({
    updateState,
    setUpdateState,
    changedInfoData,
    changedPassword,
    setIsLoadingPage,
    setChangeNameErr,
    setChangedInfoData,
    setChangedPassword,
    changedPersonalInfo,
    setSuccessDataChanged,
    requestChangedPassword,
    setChangedPersonalInfo,
    setNewPasswordsDontMatch,
    setRequestChangedPassword,
    setNewPasswordSuccessChanged,
    setOldPasswordIncorrectedText,
  })
  /// functions ///

  /// useEffects ///
  PersonalIService.GetPersonalData(changedResponsePersonalInfo, updateState)
  /// useEffects ///

  /// styles ///
  const { stylesChangeDataContainer, stylesInputsChangesEmailTel, stylesInputsChangesName } =
    PersonalISControllers({
      changeNameErr,
      successDataChanged,
      changedPersonalInfo,
      newPasswordsDontMatch,
      newPasswordSuccessChanged,
      oldPasswordIncorrectedText,
    })
  /// styles ///

  return (
    <>
      <div className={styles.personalInfoContainer}>
        <div className={styles.personalInfo}>
          <PersonalIcon /> Персональная информация
        </div>
        {changedPassword ? (
          <>
            <div className={styles.changedPasswordContainer}>
              <InputOldPass
                setRequestChangedPassword={setRequestChangedPassword}
                requestChangedPassword={requestChangedPassword}
              />
              <InputNewPass
                setRequestChangedPassword={setRequestChangedPassword}
                requestChangedPassword={requestChangedPassword}
              />
              <IRepeatNewPass
                setRequestChangedPassword={setRequestChangedPassword}
                requestChangedPassword={requestChangedPassword}
              />
            </div>
            {oldPasswordIncorrectedText ? (
              <div className={styles.oldPasswordIncorrectedText}>Старый пароль не верный</div>
            ) : null}
            {newPasswordsDontMatch ? (
              <div className={styles.newPassErr}>Новые пароли не совпадают.</div>
            ) : null}
          </>
        ) : (
          <>
            <div className={styles.personalLastNameContainer}>
              <div>Фамилия, имя:</div>
              {changedPersonalInfo ? (
                <div className={stylesInputsChangesName}>
                  <InputLastName
                    changedInfoData={changedInfoData}
                    setChangedInfoData={setChangedInfoData}
                  />
                  <InputName
                    changedInfoData={changedInfoData}
                    setChangedInfoData={setChangedInfoData}
                  />
                </div>
              ) : (
                <div>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.name === undefined &&
                      changedInfoData.lastName === undefined ? (
                        <div onClick={changePersonalInfo} className={styles.fillDataText}>
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          {changedInfoData.name}, {changedInfoData.lastName}
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles.personalEmailContainer}>
              <div>Email:</div>
              {changedPersonalInfo ? (
                <InputEmail
                  changedInfoData={changedInfoData}
                  setChangedInfoData={setChangedInfoData}
                  stylesInputsChangesEmailTel={stylesInputsChangesEmailTel}
                />
              ) : (
                <>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.email === undefined ? (
                        <div onClick={changePersonalInfo} className={styles.fillDataText}>
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          <div>{changedInfoData.email}</div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className={styles.personalTelContainer}>
              <div>Телефон:</div>
              {changedPersonalInfo ? (
                <InputTelephone
                  changedInfoData={changedInfoData}
                  setChangedInfoData={setChangedInfoData}
                  stylesInputsChangesEmailTel={stylesInputsChangesEmailTel}
                />
              ) : (
                <>
                  {isLoadingPage ? (
                    <>Loading ...</>
                  ) : (
                    <>
                      {changedInfoData.telefone === undefined ? (
                        <div onClick={changePersonalInfo} className={styles.fillDataText}>
                          Заполнить данные
                        </div>
                      ) : (
                        <>
                          <div>
                            <div>{changedInfoData.telefone}</div>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </>
        )}
        {newPasswordSuccessChanged ? (
          <div className={styles.newPasswordSuccessChangedText}>Вы успешно изменили пароль.</div>
        ) : null}
        {successDataChanged ? (
          <div className={styles.successDataChanged}>Данные были успешно изменены.</div>
        ) : null}
        <div className={stylesChangeDataContainer}>
          {changedPassword ? (
            <div onClick={onChangedPasswordRequest} className={styles.saveNewPasswordBtn}>
              Сохранить изменения
            </div>
          ) : (
            <div onClick={changePersonalInfo}>Изменить данные</div>
          )}
          {changedPersonalInfo ? (
            <div onClick={cancelChanges}>Отменить изменения</div>
          ) : (
            <>
              {changedPassword ? (
                <div onClick={onChangedPasswordForm} className={styles.cancelChangesPass}>
                  Отменить изменения
                </div>
              ) : (
                <div onClick={onChangedPasswordForm}>Изменить пароль</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
