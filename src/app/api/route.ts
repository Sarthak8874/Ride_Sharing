
// import dbConnect from "../../lib/db";

 
// type ResponseData = {
//     message: string
//   }

// export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
//     try {
//       const isConnected = await dbConnect();
//       console.log('isConnected', isConnected);
  
//       if (isConnected) {
//         Response.json(200){ message: 'Database is connected.' };
//       } else {
//         res.status(500).json({ message: 'Failed to connect to the database.' });
//       }
//     } catch (error) {
//       console.error('Error in handler:', error);
//       res.status(500).json({ message: 'An error occurred while checking the database connection.' });
//     }
//   }

// import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
// export default function handler(
//   req: Request,
// ) {
//   Response.status(200).json({ message: 'Hello from Next.js!' })
// }

// import { NextApiRequest, NextApiResponse } from 'next';

// let Res : NextApiResponse;
// export function GET( req: any, res:NextApiResponse,next: any) {
//   try {
//     // console.log("resrrrrr1",err);
//     console.log("resrrrrr0",Res);
//     console.log("resrrrrr2",req);
//     console.log("resrrrrr3",res);
//     console.log("resrrrrr4",next);

//     res.status(200).json({ message: 'Hello from Next.js!' });
//   } catch (error) {
//     // Error handling
//     console.error('Error:', error);
//     // Sending a 500 Internal Server Error response with an error message
//     res.status(500).json({ error: 'An error occurred' });
//   }
// }

import dbConnect from "../../lib/db";

export async function GET(req: Request) {
  try {
    const isConnected = await dbConnect();
    console.log('isConnected', isConnected);

    if (isConnected) {
      return Response.json({ message: 'Database is connected.' },{status:200});
    } else {
      throw new Error ;
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Failed to connect to the database.' },{status:500});
  }
}