import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native'
import { globalStyles } from '../../config/constants'

type InputProps = {
  style?: StyleProp<ViewStyle>
  error?: string
} & TextInputProps // Spread all TextInput props

export function Input({ style, error = '', ...props }: Readonly<InputProps>) {
  return (
    <View style={[style]}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? globalStyles.colors.error
              : globalStyles.colors.gold,
          },
        ]}
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    fontFamily: 'montserrat-500',
    color: globalStyles.colors.error,
  },
  input: {
    borderWidth: 2,
    borderRadius: globalStyles.borderRadius,
    paddingHorizontal: 18,
    paddingVertical: 18,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'montserrat-400',
  },
})
