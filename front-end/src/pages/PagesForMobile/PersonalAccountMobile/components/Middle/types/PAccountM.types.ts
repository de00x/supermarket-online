interface IChangedInfoData {
  id: string
  name: string
  lastName: string
  email: string
  telefone: string
}
interface IChangedPassword {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

interface IAllDeliveryAddress {
  id: string
  numberInAddress: string
  deliveryAddress: string
}
export type { IChangedInfoData, IChangedPassword, IAllDeliveryAddress }
