import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'

const DeliveryMService = {
  GetCurrentUserID(responseAllDeliveryAddress: (res: AxiosResponse) => void, updateState: boolean) {
    useEffect(() => {
      axios
        .get(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
        )
        .then((res) => responseAllDeliveryAddress(res))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateState])
  },
}
export default DeliveryMService
