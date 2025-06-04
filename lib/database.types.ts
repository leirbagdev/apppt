export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          birth_date: string
          email: string
          phone: string
          secondary_phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          emergency_contact: string
          emergency_phone: string
          height: number
          weight: number
          body_fat?: number
          objectives: string[]
          medical_restrictions?: string
          medications?: string
          injuries?: string
          experience_level: string
          wearable_device?: string
          wearable_id?: string
          plan: string
          frequency: number
          start_date: string
          payment_method: string
          observations?: string
          status: "active" | "pending" | "inactive"
          avatar_url?: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name: string
          birth_date: string
          email: string
          phone: string
          secondary_phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          emergency_contact: string
          emergency_phone: string
          height: number
          weight: number
          body_fat?: number
          objectives: string[]
          medical_restrictions?: string
          medications?: string
          injuries?: string
          experience_level: string
          wearable_device?: string
          wearable_id?: string
          plan: string
          frequency: number
          start_date: string
          payment_method: string
          observations?: string
          status?: "active" | "pending" | "inactive"
          avatar_url?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          birth_date?: string
          email?: string
          phone?: string
          secondary_phone?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          emergency_contact?: string
          emergency_phone?: string
          height?: number
          weight?: number
          body_fat?: number
          objectives?: string[]
          medical_restrictions?: string
          medications?: string
          injuries?: string
          experience_level?: string
          wearable_device?: string
          wearable_id?: string
          plan?: string
          frequency?: number
          start_date?: string
          payment_method?: string
          observations?: string
          status?: "active" | "pending" | "inactive"
          avatar_url?: string
        }
      }
      workouts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          student_id: string
          title: string
          description?: string
          schedule: string
          exercises: any[]
          status: "active" | "completed" | "cancelled"
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id: string
          title: string
          description?: string
          schedule: string
          exercises: any[]
          status?: "active" | "completed" | "cancelled"
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          student_id?: string
          title?: string
          description?: string
          schedule?: string
          exercises?: any[]
          status?: "active" | "completed" | "cancelled"
        }
      }
    }
  }
}

export type Student = Database["public"]["Tables"]["students"]["Row"]
export type CreateStudentData = Database["public"]["Tables"]["students"]["Insert"]
export type UpdateStudentData = Database["public"]["Tables"]["students"]["Update"]

export type Workout = Database["public"]["Tables"]["workouts"]["Row"]
export type WorkoutInsert = Database["public"]["Tables"]["workouts"]["Insert"]
export type WorkoutUpdate = Database["public"]["Tables"]["workouts"]["Update"]

export interface StudentSelectorStudent {
  id: string
  name: string
  avatarUrl?: string
}
