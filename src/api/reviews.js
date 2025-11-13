import api from "./apiClient";

export const getReviewsByPost = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};

export const addReview = async (postId, data) => {
  const res = await api.post(`/posts/${postId}/comments`, data);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await api.delete(`/comments/${id}`);
  return res.data;
};
