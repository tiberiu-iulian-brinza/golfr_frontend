import useSWR from 'swr'
import { getToken } from './userAuth'

export const url = `${process.env.NEXT_PUBLIC_API_URL}/users`

const useUser = userId => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('En error occurred while fethching the user')

      error.inof = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(url + '/' + userId, fetcher)

  return {
    user: data,
    error: error && error.message,
  }
}
export default useUser
