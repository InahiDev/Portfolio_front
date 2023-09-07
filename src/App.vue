<template>
  <nav>
    <router-link to="/">Page d'Accueil</router-link> |
    <router-link to="/about">A propos</router-link> |
    <router-link to="/projects">Projets</router-link> |
    <router-link to="/connect">Connexion</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
