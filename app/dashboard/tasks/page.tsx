import { createClient } from "@/lib/supabase/server"
import { TasksBoard } from "@/components/tasks/tasks-board"

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, vehicles(*), customers(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-muted-foreground">Manage your to-do list and follow-ups</p>
      </div>

      <TasksBoard initialTasks={tasks || []} userId={user.id} />
    </div>
  )
}
