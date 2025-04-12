// components/InlineMarkdownEditor.tsx
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { Switch } from "@radix-ui/react-switch"
import { toast, useToast } from "@/hooks/use-toast"
import { Download, Save, Share2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useReactToPrint } from "react-to-print"

interface MarkdownResponse {
  markdown: string
  success?: boolean
}

interface props {
  noteType: string
  markdownPayload: string
}

export function InlineMarkdownEditor({
  noteType,
  markdownPayload,
}: props): JSX.Element {
  const [markdown, setMarkdown] = useState<string>(markdownPayload)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit")
  const markdownRef = useRef<HTMLDivElement>(null)

  // Save the edited markdown back to your API/backend
  const saveMarkdown = async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Replace with your actual save endpoint
      const response = await fetch("/api/save-markdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markdown }),
      })

      if (!response.ok) {
        throw new Error("Failed to save markdown")
      }

      const data: MarkdownResponse = await response.json()
      if (data.success) {
        alert("Markdown saved successfully!")
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Error Saving!",
        description: errorMessage,
      })
      console.error("Error saving markdown:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle exporting to PDF
  const handlePrint = useReactToPrint({
    content: () => markdownRef.current,
    documentTitle: "exported-markdown",
    onBeforeGetContent: () => {
      // Ensure we're in preview mode when printing
      setViewMode("preview")
      return new Promise<void>((resolve) => {
        // Small timeout to ensure state updates before printing
        setTimeout(resolve, 0)
      })
    },
    onPrintError: (error: Error) =>
      console.error("Error printing to PDF:", error),
  })

  return (
    <div>
      <div className="border-b bg-muted px-4 py-2 flex justify-between">
        <h3 className="font-medium">{noteType}</h3>
        <div className="flex items-center space-x-1 rounded-md bg-muted p-1">
          <Button
            variant={viewMode === "edit" ? "default" : "ghost"}
            size="sm"
            className="h-8 px-3"
            onClick={() => setViewMode("edit")}
          >
            Edit
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "ghost"}
            size="sm"
            className="h-8 px-3"
            onClick={() => setViewMode("preview")}
          >
            Preview
          </Button>
        </div>
      </div>

      <div className="  mx-auto">
        {/* Toggle buttons for view mode */}

        {/* Edit/Preview Section */}
        <div className="border rounded min-h-96 mb-4">
          {viewMode === "edit" ? (
            <textarea
              className="w-full h-96 p-4 font-mono focus:outline-none resize-none"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Edit your markdown here..."
            />
          ) : (
            <div
              ref={markdownRef}
              className="w-full h-96 p-4 overflow-auto prose prose-sm max-w-none"
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Controls */}
        {/* <div className="flex gap-2 justify-between">
          <div>
            <button
              onClick={fetchMarkdownFromLLM}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
              disabled={isLoading}
            >
              Refresh from LLM
            </button>
            <button
              onClick={saveMarkdown}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50 ml-2"
              disabled={isLoading}
            >
              Save Changes
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Export as PDF
          </button>
        </div> */}
      </div>
    </div>
  )
}

interface payload {
  content: string
}

export default function PatientNotes({ content }: payload): JSX.Element {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Patient Note Template</h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <div className="rounded-lg border">
            <InlineMarkdownEditor
              noteType="Generated Patient Note"
              markdownPayload={content}
            />
          </div>
        </div>
      </div>
    </>
  )
}
