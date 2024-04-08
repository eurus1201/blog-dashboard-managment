<template>
  <div class="container-fluid h-100">
    <h1 class="mt-4 mb-4">New Article</h1>
    <div class="row justify-content-center h-100">
      <form @submit.prevent="submitForm">
        <div class="row">
          <div class="col-md-9 col-12">
            <!-- Title -->
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="post.title"
                placeholder="Enter title"
                required
              />
            </div>
            <!-- Description -->
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="post.description"
                placeholder="Enter description"
                required
              />
            </div>

            <!-- Body -->
            <div class="form-group">
              <label for="body">Body</label>
              <textarea
                class="form-control"
                id="body"
                rows="5"
                v-model="post.body"
                placeholder="Enter body"
                required
              ></textarea>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <!-- Tags -->
            <div class="form-group">
              <label>Tags</label>
              <div class="input-group mt-2">
                <input
                  type="text"
                  class="form-control"
                  v-model="newTag"
                  placeholder="Enter new tag"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="addNewTag"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div v-for="(tag, index) in tags" :key="index">
                <input
                  type="checkbox"
                  :id="'tag_' + index"
                  :value="tag"
                  v-model="selectedTags"
                />
                <label class="p-1" :for="'tag_' + index">{{ tag }}</label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { getAllTags, createNewArticle } from "@/services/articaleService";
import Toast from "@/components/Toast.vue";
import { RouterLink, useRoute } from "vue-router";
import { ref ,createApp} from "vue"; 


export default {
  name: "NewArticle",
  setup() {
    const route = useRoute(); // Access route using useRoute hook
    const post = ref({
      title: "",
      tags: [],
      description: "",
      body: "",
    });
    const isLoading = ref(false);
    const tags = ref([]);
    const selectedTags = ref([]);
    const newTag = ref("");
    
    const submitForm = async () => {
      isLoading.value = true;
      try {
        await createNewArticle(
          post.value.title,
          post.value.description,
          post.value.body,
          selectedTags.value
        );
        router.push({ name: 'AllPosts' }); 
        resetForm();
      } catch (error) {
        console.error("Error creating article:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const loadTags = async () => {
      try {
        tags.value = await getAllTags();
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    const addNewTag = () => {
      if (newTag.value.trim() !== "") {
        selectedTags.value.push(newTag.value.trim());
        newTag.value = "";
      }
    };

    const resetForm = () => {
      post.value.title = "";
      selectedTags.value = [];
      newTag.value = "";
      post.value.description = "";
      post.value.body = "";
    };

    loadTags(); // Call loadTags when component is mounted

    // Return variables and methods for template to access
    return {
      post,
      isLoading,
      tags,
      selectedTags,
      newTag,
      submitForm,
      addNewTag,
    };
  },
};
</script>
