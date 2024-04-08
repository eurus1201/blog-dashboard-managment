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
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded mr-2" alt="..." />
      <strong class="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
</template>
<script>
import { getAllTags, createNewArticle } from "@/services/articaleService";
import { ref } from "vue";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "NewArticle",
  setup() {
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
        toast("Well Done. Article created successfully. !", {
          autoClose: 2000,
          type: "success",
        });
        setTimeout(() => {
          router.push("/allPosts");
        }, 3000);
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

    loadTags(); 

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
