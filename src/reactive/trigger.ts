import { getSubscribersForProperty } from './track.ts'

export default function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}

