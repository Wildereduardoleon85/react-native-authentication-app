import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Screens, UserData } from '../types'
import { Auth } from '../components/Auth'
import { authenticate } from '../utils'

type SigninProps = {
  navigation: NavigationProp<ParamListBase>
}

export function Signin({ navigation }: Readonly<SigninProps>) {
  function handleToggleLogin() {
    navigation.navigate(Screens.Signup)
  }

  async function handleSignin(userData: UserData) {
    await authenticate('signIn', userData)
  }

  return (
    <Auth onAuthenticate={handleSignin} onToggleLogin={handleToggleLogin} />
  )
}
