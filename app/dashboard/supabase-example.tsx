import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function SupabaseExample() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Exemplo Supabase</h1>
      <ul className="list-disc pl-5">
        {todos?.map((todo: any, index: number) => (
          <li key={index}>{JSON.stringify(todo)}</li>
        ))}
      </ul>
    </div>
  )
} 