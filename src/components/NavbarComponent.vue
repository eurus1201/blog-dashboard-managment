<template>
<nav class="navbar-expand-lg text-light navbar navbar-dark bg-dark fixed-top">
  <div class="d-flex justify-content-between align-items-center w-100 px-3">
    <div class="d-flex align-items-center">
      <p class="navbar-brand mb-0">Arvan Challenge</p>
      <p class="mb-0">Welcome {{ username }}</p>
    </div>
    <div>
      <button class="btn btn-outline-primary">Logout</button>
    </div>
  </div>
</nav>


</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped></style>
