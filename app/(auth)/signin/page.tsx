import LogoNC from '@/assets/logo.png'
import { LoginForm } from '@/components/login-form'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return (
    <main className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex w-0 items-center justify-center md:w-[40%] lg:w-[60%] xl:w-[60%]">
        <Image src={LogoNC} width={800} height={800} alt="Logo" />
      </div>
      <div className="flex w-full h-full items-center justify-center md:w-[60%] lg:w-[40%] xl:w-[40%] shadow-2xl bg-slate-100">
        <div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
