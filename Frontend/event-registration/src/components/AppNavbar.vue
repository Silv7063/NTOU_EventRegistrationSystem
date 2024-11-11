<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
};
</script>

<style scoped>
nav {
  background-color: #aaa;
  padding: 1rem;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

li {
  color: white;
}
</style>
