export let depWeak = new WeakMap()
let activeEffect

export function setActiveEffect(effect) {
  activeEffect = effect
}

export default function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}

export function getSubscribersForProperty(target, key) {
  if (!depWeak.get(target)) {
    depWeak.set(target, new Map())
  }
  let keyDepMap = depWeak.get(target)
  if (!keyDepMap.get(key)) {
    keyDepMap.set(key, new Set())
  }
  return keyDepMap.get(key)
}
