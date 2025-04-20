import { ScrollArea } from "@/components/ui/scroll-area";


const CodeBlock = ({ data }: { data: any }) => {
    return (
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <pre className="text-sm text-green-400 bg-black p-4">
          <code>{data.code}</code>
        </pre>
      </ScrollArea>
    // <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
    //   <code>{data.code}</code>
    // </pre>
  )}

  export default CodeBlock
  