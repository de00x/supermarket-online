import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

const PInfoService = {
  PostPersonalData(
    changedResponsePersonalInfo: (res: AxiosResponse<any, any>) => void,
    updateState: boolean
  ) {
    useEffect(() => {
      axios
        .post('/personal-data', {
          id: localStorage.getItem('id'),
        })
        .then((res) => changedResponsePersonalInfo(res))
        .catch((err) => console.log('err', err))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateState])
  },
}
export default PInfoService
