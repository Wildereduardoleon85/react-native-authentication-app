import React from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { globalStyles } from '../../config/constants'

type ButtonContentProps = {
  isLoading?: boolean
  children: React.ReactNode
  disabled?: boolean
  textStyles?: StyleProp<TextStyle>
}
interface ButtonProps extends ButtonContentProps {
  onPress?: (event: GestureResponderEvent) => void
  rootStyles?: StyleProp<ViewStyle>
  innerContainerStyles?: StyleProp<ViewStyle>
  color?: string
}

function ButtonContent({
  isLoading,
  children,
  disabled,
  textStyles,
}: Readonly<ButtonContentProps>) {
  if (isLoading) {
    return <ActivityIndicator size="small" color={globalStyles.colors.gold} />
  }

  return typeof children === 'string' ? (
    <Text
      style={[
        styles.text,
        { color: disabled ? globalStyles.colors.lightGrey : 'white' },
        textStyles,
      ]}
    >
      {children}
    </Text>
  ) : (
    children
  )
}

export function Button({
  children,
  onPress,
  rootStyles,
  innerContainerStyles,
  textStyles,
  color = globalStyles.colors.gold,
  disabled = false,
  isLoading = false,
}: Readonly<ButtonProps>) {
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: disabled ? globalStyles.colors.veryLightGrey : color,
        },
        rootStyles,
      ]}
    >
      <Pressable
        style={({ pressed }) =>
          pressed && Platform.OS !== 'android' ? styles.pressed : null
        }
        onPress={onPress}
        android_ripple={{ color: globalStyles.colors.veryLightGold }}
        disabled={disabled}
      >
        <View style={[styles.innerContainer, innerContainerStyles]}>
          <ButtonContent
            disabled={disabled}
            isLoading={isLoading}
            textStyles={textStyles}
          >
            {children}
          </ButtonContent>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderRadius: globalStyles.borderRadius,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    minWidth: 60,
  },
  pressed: {
    opacity: 0.5,
  },
  innerContainer: {
    alignItems: 'center',
    padding: 18,
  },
  text: {
    fontSize: 16,
    fontFamily: 'montserrat-400',
  },
})
