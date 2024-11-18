import EditTopCategory from '@/Components/products/product-top-category/EditTopCategory'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <EditTopCategory id={params.id} />
    </div>
  )
}

export default page
