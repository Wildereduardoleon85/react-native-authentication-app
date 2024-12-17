import axios from 'axios'
import { UserData } from '../types'

type AuthenticateMode = 'signIn' | 'signUp'

const apiKey = 'AIzaSyCzoBAL3sr3TWM1kUh1Mxn8HF_SjMLXSNQ'
const baseUrl = 'https://identitytoolkit.googleapis.com'

export async function authenticate(
  mode: AuthenticateMode,
  { email, password }: UserData,
): Promise<void> {
  const path = `${baseUrl}/v1/accounts:${mode === 'signIn' ? 'signInWithPassword' : 'signUp'}?key=${apiKey}`

  await axios.post(path, {
    email,
    password,
    returnSecureToken: true,
  })
}
