import { Router } from 'express'
import { createBlog, getBlogs, getBlogSlug } from '../controllers/blog.controller'

const blogRouter = Router()

blogRouter.post('/', createBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:slug', getBlogSlug)

export { blogRouter }