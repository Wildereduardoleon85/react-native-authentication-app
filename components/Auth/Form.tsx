import { Alert, StyleSheet, Text, View } from 'react-native'
import { Input as TextInput, Button } from '../Ui'
import { globalStyles } from '../../config/constants'
import { useEffect, useState } from 'react'
import { UserData } from '../../types'
import { useAuthForm } from '../../hooks'

type FormProps = {
  isLogin: boolean
  onSubmit: (userData: UserData) => Promise<void>
}

export function Form({ isLogin = false, onSubmit }: Readonly<FormProps>) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const { inputs, isFormValid, resetForm } = useAuthForm()

  useEffect(() => {
    function shouldEnableButton() {
      if (isLogin) {
        return isFormValid([inputs.email, inputs.password])
      }
      return isFormValid(Object.values(inputs))
    }

    if (shouldEnableButton()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [isLogin, inputs])

  async function handleSubmit() {
    try {
      setIsSubmitting(true)
      await onSubmit({
        email: inputs.email.value,
        password: inputs.password.value,
      })
      resetForm()
      Alert.alert('user created successfully')
    } catch (error) {
      console.log(error)
      setError('An error ocurred when creating an user')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          multiline
          placeholderTextColor={globalStyles.colors.lightGrey}
          value={inputs.email.value}
          onChangeText={inputs.email.onChange}
          onBlur={inputs.email.onBlur}
          error={
            inputs.email.hasBeenTouched && inputs.email.error
              ? inputs.email.error
              : ''
          }
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm email"
            multiline
            placeholderTextColor={globalStyles.colors.lightGrey}
            value={inputs.confirmEmail.value}
            onChangeText={inputs.confirmEmail.onChange}
            onBlur={inputs.confirmEmail.onBlur}
            error={
              inputs.confirmEmail.hasBeenTouched && inputs.confirmEmail.error
                ? inputs.confirmEmail.error
                : ''
            }
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={globalStyles.colors.lightGrey}
          onChangeText={inputs.password.onChange}
          value={inputs.password.value}
          secureTextEntry
          onBlur={inputs.password.onBlur}
          error={
            inputs.password.hasBeenTouched && inputs.password.error
              ? inputs.password.error
              : ''
          }
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            placeholderTextColor={globalStyles.colors.lightGrey}
            value={inputs.confirmPassword.value}
            onChangeText={inputs.confirmPassword.onChange}
            onBlur={inputs.confirmPassword.onBlur}
            error={
              inputs.confirmPassword.hasBeenTouched &&
              inputs.confirmPassword.error
                ? inputs.confirmPassword.error
                : ''
            }
          />
        )}
      </View>
      <Button
        onPress={handleSubmit}
        isLoading={isSubmitting}
        disabled={isButtonDisabled || isSubmitting}
        rootStyles={styles.button}
        textStyles={styles.buttonText}
      >
        {isLogin ? 'Sign in' : 'Sign up'}
      </Button>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '75%',
    marginHorizontal: 'auto',
    marginTop: 20,
  },
  inputsContainer: {
    marginTop: 10,
  },
  button: {
    width: 180,
    marginHorizontal: 'auto',
    marginTop: 40,
  },
  buttonText: {
    fontFamily: 'montserrat-700',
  },
})
