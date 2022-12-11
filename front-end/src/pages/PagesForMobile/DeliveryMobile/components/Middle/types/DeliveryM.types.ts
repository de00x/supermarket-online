interface IDMStylesControllersProps {
  isCashback: boolean
  deliveryOn: string
  whatPayment: string
  whatDelivery: string
}
interface IDelMControllersProps {
  isCashback: boolean
  devicesCounter: number
  setDeliveryOn: React.Dispatch<React.SetStateAction<string>>
  setWhatPayment: React.Dispatch<React.SetStateAction<string>>
  setIsCashback: React.Dispatch<React.SetStateAction<boolean>>
  setWhatDelivery: React.Dispatch<React.SetStateAction<string>>
  setDevicesCounter: React.Dispatch<React.SetStateAction<number>>
}
export type { IDelMControllersProps, IDMStylesControllersProps }
