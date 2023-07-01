import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

// export default mongoose.model("Category", categorySchema);
const Category=new mongoose.model("Category", categorySchema);
export default Category;