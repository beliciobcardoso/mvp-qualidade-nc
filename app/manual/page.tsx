import Link from 'next/link'
import { Suspense } from 'react'
import Component from './_components/component'

const photos = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Photo ${index + 1}`,
  url: `https://via.placeholder.com/${(index + 1) * 50}`,
  description: `Description for Photo ${index + 1}`,
}))

export default function Manual() {
  return (
    <main className="flex gap-8 justify-center">
      <Link href="/">
        <p>Voltar</p>
      </Link>
      <article>
        <h1>Manual</h1>
        <p>Este é o manual de uso do sistema.</p>
        <Suspense fallback={<p>Carregando...</p>}>
          <Component initialData={photos} />
        </Suspense>
      </article>
    </main>
  )
}
