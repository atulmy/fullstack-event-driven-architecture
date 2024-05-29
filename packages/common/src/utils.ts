// Local imports
import { params } from './params'

// Slugify
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w^.^\- ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/-+/g, '-')
}

// Generate random number
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// email clean
export const emailClean = (email) => {
  return email.trim().toLowerCase()
}

// Substring with ...
export function subString(string: string = '', length: number = 0, append: boolean = true): string {
  string = string.trim()
  return string.length > length ? `${string.substring(0, length)}${append ? '...' : ''}` : string
}

// Object to buffer
export function ObjectToBuffer(payload) {
  return Buffer.from(JSON.stringify(payload))
}

// Buffer to object
export function BufferToObject(payload) {
  return JSON.parse(Buffer.from(payload, 'base64').toString())
}

// Auth check
export function authCheck(auth, role = '', exact = false) {
  return (
    auth &&
    auth.isAuthenticated &&
    auth.user &&
    auth.user.role &&
    (role
      ? exact
        ? auth.user.role === role
        : auth.user.role === role || params.user.roles[auth.user.role].access.indexOf(role) !== -1
      : true)
  )
}
