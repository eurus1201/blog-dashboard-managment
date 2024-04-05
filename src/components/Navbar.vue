<template>
    <nav class="navbar navbar-expand-lg text-light navbar-light charcoal-grey fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Your App</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <!-- Add more navbar items as needed -->
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  // No script section is needed for this component since it's a presentational component
  export default {
    name: 'Navbar'
  };
  </script>
  
  <style scoped>
  .charcoal-grey {
    background-color: #373a3c;
  }
  /* Add any custom styles here */
  </style>
  