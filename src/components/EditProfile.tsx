import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

interface EditProfileProps {
  initialName: string;
  initialContactNumber: string;
  username: string;
}

export function EditProfile({
  initialName,
  initialContactNumber,
  username,
}: EditProfileProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [contactNumber, setContactNumber] = useState(initialContactNumber);
  const [loading, setLoading] = useState(false);
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/${username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName: name, phoneNumber: contactNumber }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();
      console.log("Profile updated successfully");
      setLoading(false);
      
      router.push("/user/profile");
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactNumber" className="text-right">
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  value={contactNumber}
                  className="col-span-3"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveChanges}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
