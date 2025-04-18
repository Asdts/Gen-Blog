const ContentBlock = ({ data }: { data: any }) => {
    return (
    <ul className="list-disc list-inside text-lg">
      {data.content.map((item: any, i: number) => (
        <li key={i}><a href={item.url} className="text-blue-600 hover:underline">{item.title}</a></li>
      ))}
    </ul>
  )
}
  export default ContentBlock
  