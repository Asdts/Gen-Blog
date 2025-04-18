const CodeBlock = ({ data }: { data: any }) => {
    return (
    <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
      <code>{data.code}</code>
    </pre>
  )}

  export default CodeBlock
  