export async function GET(request: Request, reponse: Response) {
  return new Response('OK')
}

export async function POST(request: Request) {
  const { newOrder } = await request.json()
  console.log(newOrder)
  return new Response('OK')
}
