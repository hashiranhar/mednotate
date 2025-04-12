import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Edit, FileText, Filter, Plus, Search, Trash } from "lucide-react"

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Notes</h1>
          <p className="text-muted-foreground">
            Manage your medical notes and templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-9" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
            <Link href={`${i}`} key={i}>
              <Card >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {i % 3 === 0
                          ? "SOAP Note"
                          : i % 3 === 1
                          ? "Progress Note"
                          : "BIRP Note"}
                      </CardTitle>
                      <CardDescription>
                        Patient #{100 + i} •{" "}
                        {i % 2 === 0 ? "Draft" : "Completed"}
                      </CardDescription>
                    </div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        i % 2 === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                      }`}
                      >
                      {i % 2 === 0 ? "Draft" : "Completed"}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {i % 3 === 0
                      ? "Patient presents with complaints of persistent headache for the past three days. Pain is described as throbbing and located primarily in the frontal region."
                      : i % 3 === 1
                      ? "Follow-up appointment for medication review. Patient reports improved symptoms since last visit. Blood pressure readings have been within normal range."
                      : "Patient reports ongoing anxiety symptoms with occasional panic attacks. Sleep disturbance continues with difficulty falling asleep and early morning awakening."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Last edited: April {i + 5}, 2025
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 3, 5].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {i % 3 === 0
                          ? "SOAP Note"
                          : i % 3 === 1
                          ? "Progress Note"
                          : "BIRP Note"}
                      </CardTitle>
                      <CardDescription>
                        Patient #{100 + i} • Draft
                      </CardDescription>
                    </div>
                    <div className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                      Draft
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {i % 3 === 0
                      ? "Patient presents with complaints of persistent headache for the past three days. Pain is described as throbbing and located primarily in the frontal region."
                      : i % 3 === 1
                      ? "Follow-up appointment for medication review. Patient reports improved symptoms since last visit. Blood pressure readings have been within normal range."
                      : "Patient reports ongoing anxiety symptoms with occasional panic attacks. Sleep disturbance continues with difficulty falling asleep and early morning awakening."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Last edited: April {i + 5}, 2025
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[2, 4, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">
                        {i % 3 === 0
                          ? "SOAP Note"
                          : i % 3 === 1
                          ? "Progress Note"
                          : "BIRP Note"}
                      </CardTitle>
                      <CardDescription>
                        Patient #{100 + i} • Completed
                      </CardDescription>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Completed
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {i % 3 === 0
                      ? "Patient presents with complaints of persistent headache for the past three days. Pain is described as throbbing and located primarily in the frontal region."
                      : i % 3 === 1
                      ? "Follow-up appointment for medication review. Patient reports improved symptoms since last visit. Blood pressure readings have been within normal range."
                      : "Patient reports ongoing anxiety symptoms with occasional panic attacks. Sleep disturbance continues with difficulty falling asleep and early morning awakening."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Completed: April {i + 5}, 2025
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["SOAP", "DAP", "BIRP", "Progress"].map((template) => (
              <Card key={template}>
                <CardHeader>
                  <CardTitle>{template} Template</CardTitle>
                  <CardDescription>
                    Standard {template} note template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {template === "SOAP"
                      ? "Subjective, Objective, Assessment, Plan format for comprehensive patient documentation."
                      : template === "DAP"
                      ? "Data, Assessment, Plan format for focused and efficient documentation."
                      : template === "BIRP"
                      ? "Behavior, Intervention, Response, Plan format for behavioral health documentation."
                      : "General progress note format for follow-up visits and ongoing care."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
