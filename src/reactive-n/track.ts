// WeakMap<target, Map<key, Set<effect>>> // effect即为副作用

let activeEffect = null

export function setActiveEffeat(effect) {
  activeEffect = effect
}

export default function track(target, prototype) {
  let effect = getEffectForTargetByPrototype(target, prototype)
  if (activeEffect) {
    effect.add(activeEffect)
  }
}

let depWeak = new WeakMap()
export function getEffectForTargetByPrototype(target, prototype) {
  let map = depWeak.get(target)
  if (!map) {
    map = new Map()
    depWeak.set(target, map)
  }
  let effect = map.get(prototype)
  if (!effect) {
    effect = new Set()
    map.set(prototype, effect)
  }
  return effect
}
