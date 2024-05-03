/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xYHqD5MkVkT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleButtonClick = (text:string) => {
    router.push(`/${text}`);
  }
  const handleLogout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
   }
  }

  let isToken = null;
  if (typeof localStorage !== 'undefined') {
     isToken = localStorage.getItem("token");
  }
  console.log(isToken);

  return (
    <nav className="inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            <MountainIcon  />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="#">
              Home
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="#">
              About
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="#">
              Services
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="#">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isToken && <Button onClick={()=>handleLogout()}>Sign Out</Button>}
            {!isToken &&<>
              <Button onClick={()=>handleButtonClick('signin')} >
              Sign in
            </Button>
            <Button onClick={()=>handleButtonClick('signup')}>Sign up</Button>
            </>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

function MountainIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}