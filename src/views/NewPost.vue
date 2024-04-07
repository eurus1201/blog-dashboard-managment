<template>
    <div class="container-fluid mt-4">
      <form @submit.prevent="submitForm">
        <!-- Title -->
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="post.title" placeholder="Enter title" required>
        </div>
  
        <!-- Tags -->
        <div class="form-group">
          <label for="tags">Tags</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="tagInput" placeholder="Enter tags">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addTag">Add</button>
            </div>
          </div>
          <select multiple class="form-control" v-model="post.tags">
            <option v-for="(tag, index) in tags" :key="index">{{ tag }}</option>
          </select>
        </div>
  
        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="description" v-model="post.description" placeholder="Enter description" required>
        </div>
  
        <!-- Body -->
        <div class="form-group">
          <label for="body">Body</label>
          <textarea class="form-control" id="body" rows="5" v-model="post.body" placeholder="Enter body" required></textarea>
        </div>
  
        <!-- Submit Button with Loader -->
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: {
          title: '',
          tags: [],
          description: '',
          body: ''
        },
        tagInput: '',
        isLoading: false
      };
    },
    computed: {
      tags() {
        return this.post.tags;
      }
    },
    methods: {
      addTag() {
        if (this.tagInput.trim() !== '') {
          this.post.tags.push(this.tagInput.trim());
          this.tagInput = '';
        }
      },
      submitForm() {
        // Simulate API call (replace with actual API call)
        this.isLoading = true;
        setTimeout(() => {
          console.log('API call successful!');
          this.isLoading = false;
          // Reset form fields
          this.post.title = '';
          this.post.tags = [];
          this.post.description = '';
          this.post.body = '';
        }, 2000); // Simulate 2 seconds delay
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  