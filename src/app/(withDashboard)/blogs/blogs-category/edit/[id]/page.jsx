import EditBlogCategory from '@/Components/blogs/blog-category/EditBlogCategory'
import React from 'react'

const page = ({params}) => {
  return (
    <>
      <EditBlogCategory id={params.id} />
    </>
  )
}

export default page
