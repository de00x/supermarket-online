import axios, { AxiosResponse } from 'axios'
import { useEffect } from 'react'

const PersonalIService = {
  GetPersonalData(
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
export default PersonalIService
