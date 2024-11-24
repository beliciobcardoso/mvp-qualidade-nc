import Link from 'next/link'
import DropComponent from './_components/component'
export default function Drop() {
  return (
    <main className="flex justify-center gap-8">
      <Link href="/">
        <p>Voltar</p>
      </Link>
      <article>
        <DropComponent />
      </article>
    </main>
  )
}
