import { Languages, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";


export default function noteLayout(){
    return(

        <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Consultation Recorder</CardTitle>
            <CardDescription>
              Record, transcribe, and generate medical notes
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select >
              <SelectTrigger className="w-[180px]">
                <Languages className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="record">Record</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="note">Medical Note</TabsTrigger>
            <TabsTrigger value="patient-note">Patient Note</TabsTrigger>
          </TabsList>

          <TabsContent value="record" className="mt-4 space-y-4">
            <div className="flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-dashed p-8">
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold">
                  
                </h3>
                <p className="text-sm text-muted-foreground">
                 
                </p>
              </div>

              {/* Waveform visualization */}
              <div className="flex h-16 w-full items-center justify-center gap-1">
                
              </div>


          </TabsContent>

          <TabsContent value="review" className="mt-4 space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <h3 className="mb-2 font-medium">Transcription Review</h3>
                <Select >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOAP">SOAP</SelectItem>
                    <SelectItem value="DAP">DAP</SelectItem>
                    <SelectItem value="BIRP">BIRP</SelectItem>
                    <SelectItem value="Progress">Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                className="min-h-[200px]"
                
                
                placeholder="Edit the transcription if needed..."
                />
            </div>

            <div className="flex justify-between">

              <Button >
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Medical Note
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="note" className="mt-4 space-y-4">
            
            
          </TabsContent>
          <TabsContent value="patient-note" className="mt-4 space-y-4">
            
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          All recordings and transcriptions are processed securely and comply
          with HIPAA regulations. No patient data is stored on external servers.
        </p>
      </CardFooter>
    </Card>
 )
}