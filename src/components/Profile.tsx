// import React from 'react'

// function Profile() {
//   return (
//     <div className='flex justify-center my-auto h-[600px] items-center flex-col gap-4  border-4 border-green-400 w-[500px] mx-auto'>
//         <div className='flex w-[90%] items-center justify-around  gap-8 border-2 border-yellow-400  '>
//             <h1 className='text-xl font-bold leading-10 '>Pratham</h1>
//             <div className='bg-gray-400 rounded-full w-[200px] h-[200px]'></div>
//         </div>
//         <div >
//             <h2>Email</h2>
//             <p>prathamchoudhary924@gmail.com</p>
//         </div>
//     </div>
//   )
// }

// export default Profile

// import React from 'react';

// interface ProfileProps {
//   name: string;
//   mobileNumber: string;
//   password: string;
// }

// const Profile: React.FC<ProfileProps> = ({ name, mobileNumber, password }) => {
//   return (
//     <div className='border w-[500px] mx-auto my-auto ' style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '5px' }}>
//       <h2>User Profile</h2>
//       <div>
//         <strong>Name:</strong> {name}
//       </div>
//       <div>
//         <strong>Mobile Number:</strong> {mobileNumber}
//       </div>
//       <div>
//         <strong>Password:</strong> {password}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from "react";
import { EditProfile } from "./EditProfile";

interface ProfileProps {
  name: string;
  mobileNumber: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  mobileNumber,
}) => {
  return (
    <div className="flex items-center justify-center h-[600px] ">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg md:w-[500px] sm:w-[400px] mx-auto flex flex-col gap-8 mb-4 ">
        <div className="flex items-center text-center justify-center mb-4">
          <h2 className="text-2xl font-bold">User Profile</h2>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={"/Images/person-service.png"}
            alt="User Logo"
            className="w-[200px] h-[200px] rounded-full mr-4"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <span className="font-semibold">Name:</span> {name}
          </div>
          <div>
            <span className="font-semibold">Mobile Number:</span> {mobileNumber}
          </div>
          {/* <div>
            <span className="font-semibold">Password:</span> {password}
          </div> */}
        </div>
        <EditProfile/>
      </div>
    </div>
  );
};

export default Profile;
