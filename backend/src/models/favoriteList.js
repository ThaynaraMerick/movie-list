import mongoose from "mongoose";

const favoriteListSchema = new mongoose.Schema({
  movies: [
    {
      id: Number,
      title: String,
      poster_path: String,
      overview: String,
      release_date: String,
    },
  ],
  shareId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FavoriteList = mongoose.model("FavoriteList", favoriteListSchema);
export default FavoriteList;
