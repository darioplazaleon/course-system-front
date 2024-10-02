import Link from "next/link";

export default function Navbar() {
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
        <div className="flex gap-4">
          <button className="border w-20 h-10">Log in</button>
          <button className="w-20 h-10 bg-white text-black">
            <Link href="/signup">Sign up</Link>
          </button>
        </div>
      </nav>
    </header>
  );
}
