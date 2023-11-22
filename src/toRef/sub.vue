<template>
  <div>title：{{ title }}</div>
  <div>title2：{{ title2 }}</div>
  <div>props.title：{{ props.title }}</div>
  <div>props.title2：{{ props.title2 }}</div>
</template>
<script lang="ts">
import { watch, Ref, toRef, toRefs, reactive } from 'vue'

export default {
  props: ['title', 'title2'],
  setup(props) {
    let title = props.title
    // let title = toRef(props, 'title')
    // let { title } = toRefs(props)
    let title2 = props.title2
    // watch(() => props.title, (val) => {
    //   title = val
    //   alert(val)
    // })
    return {
      props,
      title,
      title2
    }
  }
}
</script>
