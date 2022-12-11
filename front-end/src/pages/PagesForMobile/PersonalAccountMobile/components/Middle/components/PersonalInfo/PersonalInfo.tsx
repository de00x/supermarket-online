import { IChangedInfoData, IChangedPassword } from '../../types/PAccountM.types'
import { ReactComponent as PersonalIcon } from '../../img/personalIcon.svg'
import { FC, useState } from 'react'
import cn from 'classnames'
import PInfoService from './services/PInfo.service'
import styles from '../../styles/styles.module.scss'
import PInfoMControllers from './services/PInfoMControllers'

export const PersonalInfo: FC = (): JSX.Element => {
  const [newPasswordSuccessChanged, setNewPasswordSuccessChanged] = useState(false)
  const [errDataIncorrectedText, setErrDataIncorrectedText] = useState(false)
  const [oldPasswordsDontMatch, setOldPasswordsDontMatch] = useState(false)
  const [newPasswordsDontMatch, setNewPasswordsDontMatch] = useState(false)
  const [changedPersonalInfo, setChangedPersonalInfo] = useState(false)
  const [changedUserPassword, setChangedUserPassword] = useState(false)
  const [successDataChanged, setSuccessDataChanged] = useState(false)
  const [errDataChanged, setErrSuccessDataChanged] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [updateState, setUpdateState] = useState(false)
  const [changedInfoData, setChangedInfoData] = useState<IChangedInfoData>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    telefone: '',
  })
  const [requestChangedPassword, setRequestChangedPassword] = useState<IChangedPassword>({
    oldPassword: 'Введите старый пароль',
    newPassword: 'Введите новый пароль',
    repeatNewPassword: 'Повторите новый пароль',
  })

  /// controllers ///
  const {
    cancelChangedData,
    changePersonalInfo,
    placeholderOldPassword,
    placeholderNewPassword,
    onChangedPasswordRequest,
    changedResponsePersonalInfo,
    placeholderRepeatNewPassword,
  } = PInfoMControllers({
    updateState,
    setUpdateState,
    changedInfoData,
    setIsLoadingPage,
    setChangedInfoData,
    changedPersonalInfo,
    changedUserPassword,
    setSuccessDataChanged,
    requestChangedPassword,
    setChangedUserPassword,
    setChangedPersonalInfo,
    setErrSuccessDataChanged,
    setOldPasswordsDontMatch,
    setNewPasswordsDontMatch,
    setErrDataIncorrectedText,
    setRequestChangedPassword,
    setNewPasswordSuccessChanged,
  })
  /// controllers ///

  /// useEffects ///
  PInfoService.PostPersonalData(changedResponsePersonalInfo, updateState)
  /// useEffects ///

  /// styles ///
  const stylesChangedDataBtnActive = cn(styles.changedData, {
    [styles.changedDataBtnActive]: changedPersonalInfo || changedUserPassword,
  })
  /// styles ///

  return (
    <div className={styles.personalInfoContainer}>
      <div className={styles.personalInfoHeader}>
        <PersonalIcon /> Персональная информация
      </div>
      {changedUserPassword ? (
        <div className={styles.changedPasswordContainer}>
          <input
            placeholder={placeholderOldPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                oldPassword: e.target.value,
              })
            }
          />
          <input
            placeholder={placeholderNewPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                newPassword: e.target.value,
              })
            }
          />
          <input
            placeholder={placeholderRepeatNewPassword}
            type="password"
            onChange={(e) =>
              setRequestChangedPassword({
                ...requestChangedPassword,
                repeatNewPassword: e.target.value,
              })
            }
          />
        </div>
      ) : (
        <>
          <div className={styles.personalLastNameContainer}>
            <div>Фамилия, имя:</div>
            {changedPersonalInfo ? (
              <div className={styles.changedNameInputContainer}>
                <input
                  value={changedInfoData.lastName}
                  onChange={(e) =>
                    setChangedInfoData({
                      ...changedInfoData,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Фамилия"
                />
                <input
                  value={changedInfoData.name}
                  onChange={(e) =>
                    setChangedInfoData({
                      ...changedInfoData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Имя"
                />
              </div>
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>
                        {changedInfoData.lastName}, {changedInfoData.name}
                      </>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.personalEmailContainer}>
            <div>Email:</div>
            {changedPersonalInfo ? (
              <input
                value={changedInfoData.email}
                onChange={(e) =>
                  setChangedInfoData({
                    ...changedInfoData,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
              />
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>{changedInfoData.email}</>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles.personalTelContainer}>
            <div>Телефон:</div>
            {changedPersonalInfo ? (
              <input
                value={changedInfoData.telefone}
                onChange={(e) =>
                  setChangedInfoData({
                    ...changedInfoData,
                    telefone: e.target.value,
                  })
                }
                placeholder="Телефон"
              />
            ) : (
              <>
                {isLoadingPage ? (
                  <div className={styles.loadingPageText}>Loading ...</div>
                ) : (
                  <div>
                    {changedInfoData.lastName !== undefined ? (
                      <>{changedInfoData.telefone}</>
                    ) : (
                      <div
                        onClick={() => setChangedPersonalInfo(true)}
                        className={styles.fillDataText}
                      >
                        Заполните данные
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
      {successDataChanged || newPasswordSuccessChanged ? (
        <div className={styles.dataSuccessChangedText}>Данные были успешно изменены.</div>
      ) : null}
      {errDataChanged ? (
        <div className={styles.createNewDataErrText}>Возникла непредвиденная ошибка.</div>
      ) : null}
      {errDataIncorrectedText ? (
        <div className={styles.incorrectedNewDataCreateText}>Введите корректные данные.</div>
      ) : null}
      {newPasswordsDontMatch ? (
        <div className={styles.incorrectedNewDataCreateText}>Новые пароли не совпадают.</div>
      ) : null}
      {oldPasswordsDontMatch ? (
        <div className={styles.incorrectedNewDataCreateText}>Старые пароли не совпадают.</div>
      ) : null}
      <div className={styles.changedDataContainer}>
        {changedUserPassword ? (
          <div onClick={onChangedPasswordRequest} className={stylesChangedDataBtnActive}>
            Сохранить изменения
          </div>
        ) : (
          <>
            {changedPersonalInfo ? (
              <div onClick={changePersonalInfo} className={stylesChangedDataBtnActive}>
                Сохранить изменения
              </div>
            ) : (
              <div
                onClick={() => setChangedPersonalInfo(true)}
                className={stylesChangedDataBtnActive}
              >
                Изменить данные
              </div>
            )}
          </>
        )}
        {changedPersonalInfo || changedUserPassword ? (
          <div onClick={cancelChangedData} className={styles.changedCancel}>
            Отменить изменения
          </div>
        ) : (
          <div onClick={() => setChangedUserPassword(true)} className={styles.changedPassword}>
            Изменить пароль
          </div>
        )}
      </div>
    </div>
  )
}
