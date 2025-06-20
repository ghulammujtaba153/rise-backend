import Blog from "../models/blogSchema.js"


export const createBlog = async (req, res) => {
    const {userId, mainImage, title, content} = req.body

    try {
        const blog = await Blog.create({userId, mainImage, title, content})
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find({isDeleted: false}).populate("userId")
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getBlog = async (req, res) => {
    const {id} = req.params
    try {
        const blog = await Blog.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteBlog = async (req, res) => {
    const {id} = req.params

    try {
        const blog = await Blog.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { userId, mainImage, title, content } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { userId, mainImage, title, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Update Blog Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
