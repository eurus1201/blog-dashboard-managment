import withAuth from "./withAuth";
import router from "@/router";

const BASE_URL = "https://api.realworld.io/api";


export const deleteArticle = async (slug) => {
  try {
    await withAuth("delete", `${BASE_URL}/articles/${slug}`);
    console.log("Article deleted successfully.", "Success");
  } catch (error) {
    console.error("Error deleting article:", error);
    console.log("Error deleting article.", "Error");
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

    await withAuth("post", `${BASE_URL}/articles`, articleData)
  } catch (error) {
    console.error("Error creating article:", error);
    console.log("Error creating article.", "Error");
    throw error;
  }
};

export const editArticle = async (slug, updatedBody,updatedTitle,updatedDescription,updatedTagList) => {
  try {
    const articleData = {
      article: {
        body: updatedBody,
        title : updatedTitle,
        description : updatedDescription,
        tagList: updatedTagList,
      },
    };
    await withAuth("put", `${BASE_URL}/articles/${slug}`, articleData);
    console.log("Well done! Article updated successfully.", "Success");
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
    console.log("Error fetching articles.", "Error");
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
    console.log("Error fetching articles.", "Error");
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
    console.log("Error fetching articles.", "Error");
    return { articles: [], articlesCount: 0 };
  }
};

export const getArticleWithSlug = async (slug) => {
  try {
    const response = await withAuth("get", `${BASE_URL}/articles/${slug}`);
    return response.article; 
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};
