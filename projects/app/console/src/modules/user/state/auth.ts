// Imports
import { atom } from 'jotai'

// initial
export const initial = {
  status: false,
  token: null,
  user: null,
}

// user auth
const atomWithLocalStorage = (key, initialValue) => {
  // atom - initial value
  const getInitialValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
    } catch (error) {}
    return initialValue
  }

  // atom - base
  const baseAtom = atom(getInitialValue())

  // atom - derived
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      try {
        const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update
        set(baseAtom, nextValue)
        window.localStorage.setItem(key, JSON.stringify(nextValue))
      } catch (error) {}
    }
  )

  return derivedAtom
}

// user auth
export const userAuth = atomWithLocalStorage('userAuth', initial)
