import { useState } from 'react'
import { Input, InputNames, Inputs } from '../types'
import { isValidEmail } from '../utils'

const initialValues: Inputs = {
  email: {
    value: '',
    hasBeenTouched: false,
    error: null,
  },
  confirmEmail: {
    value: '',
    hasBeenTouched: false,
    error: null,
  },
  password: {
    value: '',
    hasBeenTouched: false,
    error: null,
  },
  confirmPassword: {
    value: '',
    hasBeenTouched: false,
    error: null,
  },
}

function isFormValid(inputValues: Input[]) {
  const hasBeenTouched = (input: Input) => input.hasBeenTouched
  const hasNoError = (input: Input) => !input.error
  const hasValue = (input: Input) => input.value !== ''

  const everyFiledIsValid = inputValues.every(hasNoError)
  const everyFiledHasBeenTouched = inputValues.every(hasBeenTouched)
  const everyFiledHasAValue = inputValues.every(hasValue)

  return (
    (everyFiledHasBeenTouched && everyFiledHasAValue && everyFiledIsValid) ||
    (everyFiledHasAValue && everyFiledIsValid)
  )
}

export function useAuthForm() {
  const [inputs, setInputs] = useState<Inputs>(initialValues)
  const requiredErrorText = 'this field is required'

  function handleEmailChange(text: string) {
    if (text.trim().length === 0) {
      setInputs((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: requiredErrorText,
          value: text,
        },
      }))
      return
    }

    if (!isValidEmail(text)) {
      setInputs((prevState) => ({
        ...prevState,
        email: {
          ...prevState.email,
          error: 'email not valid',
          value: text,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      email: {
        ...prevState.email,
        value: text,
        error: null,
      },
    }))
  }

  function handlePasswordChange(text: string) {
    if (text.trim().length === 0) {
      setInputs((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: requiredErrorText,
          value: text,
        },
      }))
      return
    }

    if (text.trim().length < 6) {
      setInputs((prevState) => ({
        ...prevState,
        password: {
          ...prevState.password,
          error: 'the password must be at least 6 characters long',
          value: text,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      password: {
        ...prevState.password,
        value: text,
        error: null,
      },
    }))
  }

  function handleConfirmEmailChange(text: string) {
    if (inputs.email.value !== text) {
      setInputs((prevState) => ({
        ...prevState,
        confirmEmail: {
          ...prevState.confirmEmail,
          error: "the email doesn't match",
          value: text,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      confirmEmail: {
        ...prevState.confirmEmail,
        value: text,
        error: null,
      },
    }))
  }

  function handleConfirmPasswordChange(text: string) {
    if (inputs.password.value !== text) {
      setInputs((prevState) => ({
        ...prevState,
        confirmPassword: {
          ...prevState.confirmPassword,
          error: "the password doesn't match",
          value: text,
        },
      }))
      return
    }

    setInputs((prevState) => ({
      ...prevState,
      confirmPassword: {
        ...prevState.confirmPassword,
        error: null,
        value: text,
      },
    }))
  }

  function handleBlur(inputName: InputNames) {
    setInputs((prevState) => ({
      ...prevState,
      [inputName]: {
        ...prevState[inputName],
        hasBeenTouched: true,
        ...(inputs[inputName].value.trim().length === 0 && {
          error: requiredErrorText,
        }),
      },
    }))
  }

  function resetForm() {
    setInputs(initialValues)
  }

  return {
    inputs: {
      email: {
        value: inputs.email.value,
        error: inputs.email.error,
        hasBeenTouched: inputs.email.hasBeenTouched,
        onChange: handleEmailChange,
        onBlur: () => handleBlur('email'),
      },
      confirmEmail: {
        value: inputs.confirmEmail.value,
        error: inputs.confirmEmail.error,
        hasBeenTouched: inputs.confirmEmail.hasBeenTouched,
        onChange: handleConfirmEmailChange,
        onBlur: () => handleBlur('confirmEmail'),
      },
      password: {
        value: inputs.password.value,
        error: inputs.password.error,
        hasBeenTouched: inputs.password.hasBeenTouched,
        onChange: handlePasswordChange,
        onBlur: () => handleBlur('password'),
      },
      confirmPassword: {
        value: inputs.confirmPassword.value,
        error: inputs.confirmPassword.error,
        hasBeenTouched: inputs.confirmPassword.hasBeenTouched,
        onChange: handleConfirmPasswordChange,
        onBlur: () => handleBlur('confirmPassword'),
      },
    },
    isFormValid,
    resetForm,
  }
}
