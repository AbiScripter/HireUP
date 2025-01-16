import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lavefrpusgledzkzxaji.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdmVmcnB1c2dsZWR6a3p4YWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzUzNzYsImV4cCI6MjA1MTgxMTM3Nn0.6pUOxrQyvQ8tXJTrksl2yuMqiuYEAoXmtHU-0sRiT1Y";

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadResumeToSupabase = async (file) => {
  const fileName = `resumes/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("resumes") //bucket name
    .upload(fileName, file);

  if (error) {
    console.error("Supabase upload error:", error.message);
    return null;
  }

  // Generate a public URL for the uploaded file
  const { data: publicUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
