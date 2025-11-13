import { supabase } from "../config/supabase.js";

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const { data, error } = await supabase.from("messages").select("*");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create message
export const createMessage = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("messages")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
