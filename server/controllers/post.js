import { supabase } from "../config/supabase.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { data, error } = await supabase.from("post").select("*");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create post
export const createPost = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("post")
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("post")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("post").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
