import Link from "next/link";
import { backUri } from "../security/Security";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export async function getUserInfo() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    const tokenJwt = token.value;
    let data = await fetch(`${backUri}/users/me`, {
      headers: {
        Authorization: `Bearer ${tokenJwt}`,
      },
    });

    let user = await data.json();
    return user;
  } else {
    return null;
  }
}

export default async function Navbar() {
  const user = await getUserInfo();

  const userRole = user ? user.role : null;

  return (
    <header className="w-full h-20 bg-gray-800 text-white flex items-center justify-center">
      <nav className="w-11/12 h-full flex items-center justify-between">
        <div className="pl-4 flex gap-6">
          <h1>Courselint</h1>
          <button>Categories</button>
        </div>
        <div className="w-96 text-black">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full rounded-lg pl-4 h-10"
          />
        </div>
        <div className="h-full flex items-center justify-center gap-5">
          {userRole === "INSTRUCTOR" ? (
            <button className="w-24 h-12 bg-white text-black font-semibold">
              <Link href="/create-course">Create course</Link>
            </button>
          ) : (
            ""
          )}
          {user ? (
            <>
              <button className="w-24 h-12 bg-white text-black font-semibold">
                My courses
              </button>
              <Avatar className="w-10 h-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full"
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <>
              <button className="border w-20 h-10">
                <Link href="/login">Login</Link>
              </button>
              <button className="w-20 h-10 bg-white text-black">
                <Link href="/signup">Sign up</Link>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
