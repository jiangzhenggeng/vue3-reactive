import { setActiveEffect } from './track.ts'

export default function watchEffect(update) {
  const effect = () => {
    setActiveEffect(effect)
    update()
    setActiveEffect(null)
  }
  effect()
}
