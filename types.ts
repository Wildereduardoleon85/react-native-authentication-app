export enum Screens {
  Signin = 'Signin',
  Signup = 'Signup',
}

export type UserData = {
  email: string
  password: string
}

export type InputNames =
  | 'email'
  | 'confirmEmail'
  | 'password'
  | 'confirmPassword'

export type Input = {
  value: string
  hasBeenTouched: boolean
  error: string | null
}

export type Inputs = { [key in InputNames]: Input }
