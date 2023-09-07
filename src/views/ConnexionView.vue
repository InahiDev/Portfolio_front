<template>
  <div class="container centered">
    <h2>Page de connexion</h2>
    <form>
      <label for="email">
        Email :<br/>
        <input name="email" class="email" type="email"/><br/>
      </label>
      <label for="password">
        Password :<br/>
        <input name="password" class="password" type="password" />
      </label><br/>
      <input type="button" value="Connexion" @click="login()" @keyup.enter="login()"/>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const mailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

export default {
  name: "LoginView",
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      errorMsg: ''
    }
  }, computed: {
    ...mapState(['status', 'user'])
  },
  methods: {
    validatedEmail() {
      if (mailRegex.test(this.email) && this.password !== '') {
        return true
      } else {
        return false
      }
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => this.$router.push('home'))
        .catch((error) => this.errorMsg = error.response.data.message)
    }
  }
}


</script>

<style>

</style>