import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://eayaowqwjfnqhxblfupx.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVheWFvd3F3amZucWh4YmxmdXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTIxOTksImV4cCI6MTk4NDAyODE5OX0.ulRBJ9oYKF-sZugQuGyShkl-ls_ZhrpMkcUIfgLFM3E";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);


export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video")
        .select("*");
    }
  }
}