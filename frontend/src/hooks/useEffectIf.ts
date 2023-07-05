import { useEffect } from 'react'

export const useEffectIf = (condition: Boolean, action: () => void): void => {
  useEffect(() => {
    if (condition) {
      action()
    }
  }, [action, condition])
}
