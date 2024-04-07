<template>
  <div class="container mt-4">
    <h1>All posts</h1>
    <div class="table-responsive">
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Tags</th>
            <th scope="col">Excerpt</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(article, index) in articles" :key="article.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ article.title }}</td>
            <td>{{ article.author.username }}</td>
            <td>
              <span
                v-for="(tag, index) in article.tagList"
                :key="index"
                class="badge bg-primary"
                >{{ tag }}</span
              >
            </td>
            <td>{{ article.description }}</td>
            <td>{{ article.createdAt }}</td>
            <td>
              <select
                class="form-select btn-primary"
                @change="handleActionChange(article, $event.target.value)"
              >
                <option value="" disabled selected>-</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex flex-row-reverse justify-content-center m-2">
      <div>
        <button @click="prevPage" :disabled="currentPage <= 1"><</button>
        <button
          v-for="pageNumber in Math.ceil(articlesCount / 10)"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage >= Math.ceil(articlesCount.value / pageSize)"
        >
          >
        </button>
      </div>
    </div>

    <!-- Modal for delete confirmation -->
    <DeleteModal
      v-if="deleteModalVisible"
      @close="closeModal"
      @confirm="deleteConfirmed"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  deleteArticle,
  getAllArticlesFirstPage,
  getAllArticles,
} from "@/services/articaleService";
import { useRoute } from "vue-router";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  name: "AllPosts",
  setup() {
    const route = useRoute();
    const articles = ref([]);
    const articlesCount = ref(0);
    const currentPage = ref(1);
    const deleteTargetSlug = ref(null);
    const deleteModalVisible = ref(false);

    onMounted(async () => {
      await loadArticles(currentPage.value);
    });
    const loadArticles = async (page) => {
      if (page === 1) {
        const {
          articles: fetchedArticles,
          articlesCount: fetchedArticlesCount,
        } = await getAllArticlesFirstPage();
        articles.value = fetchedArticles;
        articlesCount.value = fetchedArticlesCount;
      } else {
        const {
          articles: fetchedArticles,
          articlesCount: fetchedArticlesCount,
        } = await getAllArticles(page);
        articles.value = fetchedArticles;
        articlesCount.value = fetchedArticlesCount;
      }
      currentPage.value = page;
    };
    const nextPage = async () => {
      await loadArticles(currentPage.value + 1);
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        await loadArticles(currentPage.value - 1);
      }
    };

    const handleActionChange = (article, action) => {
      if (action === "delete") {
        console.log("delete called");
        deleteTargetSlug.value = article.slug;
        deleteModalVisible.value = true;
        console.log(deleteModalVisible.value, "set");
      } else if (action === "edit") {
        router.push(`/articles/edit/${article.slug}`);
      }
    };
    const deleteConfirmed = async () => {
      try {
        console.log("call api");
        await deleteArticle(deleteTargetSlug.value);
        await loadArticles();
        deleteModalVisible.value = false;
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    };
    const closeModal = () => {
      deleteModalVisible.value = false;
    };

    return {
      articles,
      articlesCount,
      currentPage,
      nextPage,
      prevPage,
      handleActionChange,
      deleteConfirmed,
      closeModal,
      deleteModalVisible,
    };
  },
};
</script>

<style></style>
