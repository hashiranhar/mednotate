import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, we would check authentication here
  // For demo purposes, redirect to dashboard
  redirect("/dashboard")
}
