<template>
    <div class="card" style="border-radius: 4px; width: 450px; height: 423px;">
      <div class="card-body" style="padding: 37px 20px 19px; background-color: #ECEEEF;">
        <!-- Your card content goes here -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomCard'
  }
  </script>