
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(['role']),

    isSuperAdmin() {
      return this.role == 1
    },

    isadmin() {
      return this.role == 1 || this.role == 2
    },

    isNormal() {
      return this.role == 3
    }
  },
  mounted() {
    console.log('权限混入 注入');
  },
}