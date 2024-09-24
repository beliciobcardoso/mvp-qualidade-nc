'use server'
import { Relatorio } from '@/lib/types'

export async function saveRelatorio(data: Relatorio) {
  // save relatorio to database asynchronously
  const teste = await data

  return console.log(teste)
}
