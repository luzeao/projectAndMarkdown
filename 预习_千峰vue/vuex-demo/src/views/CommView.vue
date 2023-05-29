<template>
  <div>
    <p>{{ lookBoth }}</p>
    <p>{{ lookBothDouble }}</p>
    <p>
      <button @click="addBoth({ a: 10, b: 20 })">addBoth</button>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('mdB', ['lookBoth', 'lookBothDouble'])
  },
  methods: {
    ...mapActions('mdB', ['addBoth'])
  },
}
</script>

<style lang="scss" scoped></style>