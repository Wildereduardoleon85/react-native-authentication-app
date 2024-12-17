import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../config/constants'
import { UserData } from '../../types'
import { Form } from './Form'

type AuthProps = {
  isLogin?: boolean
  onToggleLogin: () => void
  onAuthenticate: (userData: UserData) => Promise<void>
}

export function Auth({
  isLogin = true,
  onToggleLogin,
  onAuthenticate,
}: Readonly<AuthProps>) {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Crypto<Text style={styles.highlighted}>gen</Text>
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Open</Text>
          <Text style={styles.subtitle}>your wallet</Text>
        </View>
        <Form isLogin={isLogin} onSubmit={onAuthenticate} />
        <View style={styles.messageContainer}>
          <Text style={styles.text}>
            {isLogin ? 'New to Cryptogen?' : 'Alredy have an account?'}{' '}
          </Text>
          <Pressable onPress={onToggleLogin}>
            <Text style={styles.textHighlited}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'montserrat-400',
    textAlign: 'center',
    marginTop: 70,
  },
  highlighted: {
    fontSize: 30,
    fontFamily: 'montserrat-700',
  },
  subtitle: {
    fontFamily: 'montserrat-500',
    fontSize: 30,
    textAlign: 'center',
    color: globalStyles.colors.gold,
  },
  subtitleContainer: {
    marginTop: 30,
  },
  text: {
    color: globalStyles.colors.grey,
    fontFamily: 'montserrat-500',
  },
  textHighlited: {
    color: globalStyles.colors.gold,
    fontFamily: 'montserrat-700',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
})
