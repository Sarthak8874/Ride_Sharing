import AdminPortal from '@/components/AdminPortal'
import MultiTabs from '@/components/MultiTabs'
import withAuth from '@/components/withAuth'
import React from 'react'

function page() {
  return (
    <div>
        <AdminPortal/>
        {/* <MultiTabs/> */}
    </div>
  )
}

export default page