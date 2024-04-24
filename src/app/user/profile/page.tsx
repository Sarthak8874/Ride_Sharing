import Profile from '@/components/Profile'
import React from 'react'

const user = {
  name: 'John Doe',
  mobileNumber: '123-456-7890',
};

function page() {
  return (
    <div>
        <Profile {...user} />
    </div>
  )
}

export default page