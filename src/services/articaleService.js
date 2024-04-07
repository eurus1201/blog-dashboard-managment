import withAuth from "./withAuth";
import Toast from "@/components/Toast.vue";
import router from "@/router";

const BASE_URL = "https://api.realworld.io/api";

const showToastMessage = (message, status) => {
  const toast = new Toast({
    propsData: {
      message,
      status,
    },
  });
  toast.$mount();
  document.body.appendChild(toast.$el);
};

export const deleteArticle = async (slug) => {
  try {
    await withAuth("delete", `${BASE_URL}/articles/${slug}`);
    showToastMessage("Article deleted successfully.", "Success");
  } catch (error) {
    console.error("Error deleting article:", error);
    showToastMessage("Error deleting article.", "Error");
    throw error;
  }
};

export const createNewArticle = async (title, description, body, tagList) => {
  try {
    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    await withAuth("post", `${BASE_URL}/articles`, articleData).then(()=>{
      showToastMessage("Well done! Article created successfully.", "Success");
      router.push("/allPosts");
    })
  } catch (error) {
    console.error("Error creating article:", error);
    showToastMessage("Error creating article.", "Error");
    throw error;
  }
};

export const editArticle = async (slug, updatedBody) => {
  try {
    const articleData = {
      article: {
        body: updatedBody,
      },
    };
    await withAuth("put", `${BASE_URL}/articles/${slug}`, articleData);
    showToastMessage("Well done! Article updated successfully.", "Success");
    router.push("/allPosts");
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const getAllTags = async () => {
  try {
    const data = await withAuth("get", `${BASE_URL}/tags`);
    return data.tags;
  } catch (error) {
    console.error("Error fetching articles:", error);
    showToastMessage("Error fetching articles.", "Error");
    return [];
  }
};

export const getAllArticlesFirstPage = async () => {
  try {
    const data = await withAuth("get", `${BASE_URL}/articles`);
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    showToastMessage("Error fetching articles.", "Error");
    return [];
  }
};
export const getAllArticles = async (page) => {
  try {
    const data = await withAuth("get", `${BASE_URL}/articles/page/${page}`);
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    showToastMessage("Error fetching articles.", "Error");
    return { articles: [], articlesCount: 0 };
  }
};