import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-around w-screen bg-slate-700 py-2 text-white">
      <div className="flex items-center ">
        <Link href="/">
          <h1>Home</h1>
        </Link>
      </div>
      <div>
        <ul className="flex">
          <Link href="/drop">
            <li className="hover:bg-white hover:text-slate-900 py-2 px-4 rounded-sm">
              Drop
            </li>
          </Link>
          <Link href="/manual">
            <li className="hover:bg-white hover:text-slate-900 py-2 px-4 rounded-sm">
              Manual
            </li>
          </Link>
          <Link href="/app">
            <li className="hover:bg-white hover:text-slate-900 py-2 px-4 rounded-sm">
              ADD
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
