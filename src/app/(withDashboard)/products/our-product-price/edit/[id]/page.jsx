import EditOurProductPrice from '@/Components/products/our-product-price/EditOurProductPrice'
import React from 'react'

const page = ({params}) => {
  return (
    <>
      <EditOurProductPrice id={params?.id}/>
    </>
  )
}

export default page
