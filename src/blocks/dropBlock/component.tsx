const DropBlock = ({ data }: { data: any }) => {
    return (
    <div className="bg-gray-100 p-3 border-b">
      {data.type.map((item: any, i: number) => (
        <div key={i} className="inline-block mr-4">
          <strong>{item.main}:</strong> {item.sub}
        </div>
      ))}
    </div>
  )}
  export default DropBlock
  