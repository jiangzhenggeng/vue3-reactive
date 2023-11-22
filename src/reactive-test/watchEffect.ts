import { setActiveEffeat } from './track.ts'

export default function watchEffect(fn) {
  let effect = () => {
    setActiveEffeat(effect)
    fn()
    setActiveEffeat(null)
  }
  effect()
}
