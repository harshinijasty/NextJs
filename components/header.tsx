"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/components/registrationcontext";
import Avatar from "./avatar";
import Logout from "./logout";

const Header = () => {
    const { user} = useUser();      

    return (
        <header className="w-full bg-blue-600 text-white p-2 flex justify-between items-center shadow-mg">
            <Link href={"/"}> <h1 className="text-2xl font-semibold">Home</h1></Link>
            <Link href={"/"}> <h1 className="text-2xl font-semibold">About</h1></Link>
            <Link href={"/google-map"}> <h1 className="text-2xl font-semibold">Contact</h1></Link>

            <div className="flex items-center gap-4">
        {user && (
          <>
            <Avatar user={user} />
            <Logout /> {/* Logout Button */}
          </>
        )}
      </div>


        </header>
    )
}
export default Header;