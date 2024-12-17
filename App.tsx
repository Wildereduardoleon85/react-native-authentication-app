import { ActivityIndicator } from 'react-native'
import { Signin, Signup } from './screens'
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screens } from './types'

export type RootStackParamList = {
  Signin: undefined
  Signup: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [fontsLoaded] = useFonts({
    'montserrat-400': Montserrat_400Regular,
    'montserrat-500': Montserrat_500Medium,
    'montserrat-700': Montserrat_700Bold,
  })

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name={Screens.Signin}
          component={Signin}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={Screens.Signup}
          component={Signup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
