import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-8 justify-center">
      <header className="flex justify-around w-screen bg-slate-700 py-2">
        <div className="flex items-center">
        <h1>Home</h1>
        </div>
        <div>
          <ul className="flex">
            <Link href="/drop">
              <li className="hover:bg-white hover:text-slate-900 py-2 px-4 rounded-sm">Drop</li>
            </Link>
            <Link href="/manual">
              <li className="hover:bg-white hover:text-slate-900 py-2 px-4 rounded-sm">Manual</li>
            </Link>
          </ul>
        </div>
      </header>
    </main>

  );
}
