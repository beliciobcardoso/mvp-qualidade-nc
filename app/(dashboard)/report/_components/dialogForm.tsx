'use client'
import { toast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  nome: z.string().min(2, {
    message: 'nome must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'email must be a valid email.',
  }),
  cargo: z.string().min(2, {
    message: 'cargo must be at least 2 characters.',
  }),
})

interface ReportFormProps {
  person: string | { nome: string; email: string; cargo: string }
}

export function ReportForm({ person }: ReportFormProps) {
  // const [items, setItems] = useState<string[]>([])

  // console.log(person)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: person
        ? (person as { nome: string; email: string; cargo: string }).nome
        : '',
      email: person
        ? (person as { nome: string; email: string; cargo: string }).email
        : '',
      cargo: person
        ? (person as { nome: string; email: string; cargo: string }).cargo
        : '',
    },
  })

  // console.log(items[0])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cargo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <FormControl>
                <Input placeholder="Cargo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
