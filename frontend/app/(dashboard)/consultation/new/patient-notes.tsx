// components/InlineMarkdownEditor.tsx
import { Alert } from "../../../components/ui/alert.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Label } from "@radix-ui/react-label"
import { Switch } from "@radix-ui/react-switch"
import { toast } from "@/components/ui/use-toast.ts"
import { Download, Save, Share2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import React from "react"
const ReactMarkdown = React.lazy(() => import("react-markdown"))
import { useReactToPrint } from "react-to-print"
import type { Components } from 'react-markdown'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/dark'
import remarkGfm from 'remark-gfm'

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
    print: () => Promise.resolve(markdownRef.current),
    documentTitle: "exported-markdown",
    onBeforePrint: () => {
      // Ensure we're in preview mode when printing
      setViewMode("preview")
      return new Promise<void>((resolve) => {
        // Small timeout to ensure state updates before printing
        setTimeout(resolve, 0)
      })
    },
    onPrintError: (errorLocation: "onBeforePrint" | "print", error: Error) =>
      console.error(`Error occurred during ${errorLocation}:`, error),
  })

  return (
<div>
      <div className="border-b bg-muted px-4 py-2 flex justify-between">
        <h3 className="font-medium">{noteType}</h3>
        <div className="flex items-center space-x-1 rounded-md bg-muted p-1">
          <Button
            variant={viewMode === "edit" ? "default" : "ghost"}
            size="sm"
            className={`h-8 px-3 transition-all duration-200 ${
              viewMode === "edit"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted-foreground/10"
            }`}
            onClick={() => setViewMode("edit")}
          >
            Edit
          </Button>
          <Button
            variant={viewMode === "preview" ? "default" : "ghost"}
            size="sm"
            className={`h-8 px-3 transition-all duration-200 ${
              viewMode === "preview"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted-foreground/10"
            }`}
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
              className="w-full h-96 p-4 overflow-auto prose prose-sm max-w-none dark:prose-invert"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="mb-1" {...props} />,
                  code: ({node, className, children, ...props}) => {
                    const isInline = !className?.includes('language-')
                    if (isInline) {
                      return <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded" {...props}>{children}</code>
                    }
                    return <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mb-4" {...props}>{children}</code>
                  }
                }}
              >
                {markdown}
              </ReactMarkdown>
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
