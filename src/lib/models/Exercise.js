import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },          // Full URL if you want
    thumbnailPublicId: { type: String },  // Cloudinary ID
    youtubeId: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    steps: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", ExerciseSchema);
