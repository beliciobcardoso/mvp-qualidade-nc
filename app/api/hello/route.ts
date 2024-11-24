import { NextResponse } from 'next/server'

export function GET() {
  try {
    return NextResponse.json({ message: 'Hello' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
