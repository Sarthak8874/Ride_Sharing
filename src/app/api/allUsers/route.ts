import dbConnect from "@/lib/db";
import  User  from "@/models/User";

export async function GET(req: Request) {
    try {
      const isConnected = await dbConnect();
      console.log('hteh');
      if (!isConnected) {
        throw new Error('Failed to connect to the database.');
      }
    
      const users = await User.find({});
      return Response.json(users,{status:200});

    } catch (error) {

      return Response.json({ message: 'Server error' },{status:500});
    }
  }