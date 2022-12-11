import { selectCart } from '../../../../../../redux/slices/selectors'
import { IDelMControllersProps } from '../types/DeliveryM.types'
import { useAppSelector } from '../../../../../../hooks/hooks'

const DeliveryMControllers = ({
  setWhatDelivery,
  setDeliveryOn,
  setWhatPayment,
  setIsCashback,
  isCashback,
  devicesCounter,
  setDevicesCounter,
}: IDelMControllersProps) => {
  const { items, totalPrice } = useAppSelector(selectCart)
  const totalCount = items.reduce(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (sum: number, item: any) => sum + item.count,
    0
  )
  const onClickCourier = (): void => {
    setWhatDelivery('Курьером')
  }
  const onClickForTime = (): void => {
    setDeliveryOn('Время')
  }
  const onClickPickup = (): void => {
    setWhatDelivery('Самовывоз')
  }
  const onClickInCash = (): void => {
    setWhatPayment('Наличными')
  }
  const onClickInCard = (): void => {
    setWhatPayment('Картой')
  }
  const onClickForNow = (): void => {
    setDeliveryOn('Сейчас')
  }
  const onClickCashback = (): void => {
    setIsCashback(!isCashback)
  }
  const onClickDevicesMinus = (): number | null => {
    if (devicesCounter !== 0) {
      setDevicesCounter(devicesCounter - 1)
    }
    return null
  }
  const onClickDevicesPlus = (): void => {
    setDevicesCounter(devicesCounter + 1)
  }
  return {
    totalPrice,
    totalCount,
    onClickPickup,
    onClickInCash,
    onClickInCard,
    onClickForNow,
    onClickCourier,
    onClickForTime,
    onClickCashback,
    onClickDevicesPlus,
    onClickDevicesMinus,
  }
}
export default DeliveryMControllers
