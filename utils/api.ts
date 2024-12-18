import axios from 'axios'
import { UserData } from '../types'
import { API_KEY, BASE_URL } from '@env'

type AuthenticateMode = 'signIn' | 'signUp'

export async function authenticate(
  mode: AuthenticateMode,
  { email, password }: UserData,
): Promise<void> {
  const path = `${BASE_URL}/v1/accounts:${mode === 'signIn' ? 'signInWithPassword' : 'signUp'}?key=${API_KEY}`

  await axios.post(path, {
    email,
    password,
    returnSecureToken: true,
  })
}
