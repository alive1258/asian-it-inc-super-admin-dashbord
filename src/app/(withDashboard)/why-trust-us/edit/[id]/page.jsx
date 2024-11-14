import EditWhyTrustUs from '@/Components/why-trust-us/EditWhyTrustUs'
import React from 'react'

const page = ({params}) => {
  return (
    <>
      <EditWhyTrustUs id={params?.id}/>
    </>
  )
}

export default page
