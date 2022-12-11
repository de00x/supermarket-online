import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'

const PAccountService = {
  GetAllDeliveryAddress(
    responseAllDeliveryAddress: (res: AxiosResponse<any, any>) => void,
    responseSuccessNewAddress: boolean
  ) {
    useEffect(() => {
      axios
        .get(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `/delivery-address/?currentUserId=${localStorage.getItem('id')}`
        )
        .then((res) => responseAllDeliveryAddress(res))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseSuccessNewAddress])
  },
}

export default PAccountService
