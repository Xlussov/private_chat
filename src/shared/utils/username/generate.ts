import { ANIMALS } from "@/shared/constants/username"
import { nanoid } from "nanoid"

export const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
  return `anonymous-${word}-${nanoid(5)}`
}
