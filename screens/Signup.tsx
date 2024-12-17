import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Screens, UserData } from '../types'
import { Auth } from '../components/Auth'
import { authenticate } from '../utils'

type SignupProps = {
  navigation: NavigationProp<ParamListBase>
}

export function Signup({ navigation }: Readonly<SignupProps>) {
  function handleToggleLogin() {
    navigation.navigate(Screens.Signin)
  }

  async function handleSignup(userData: UserData) {
    await authenticate('signUp', userData)
  }

  return (
    <Auth
      onAuthenticate={handleSignup}
      isLogin={false}
      onToggleLogin={handleToggleLogin}
    />
  )
}
