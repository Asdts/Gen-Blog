import { Card, CardContent } from "@/components/ui/card";


const ContentBlock = ({ data }: { data: any }) => {
    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.content.map((item, i) => (
          <Card key={i}>
            <CardContent>
              <a href={item.url} className="text-blue-600 hover:underline">{item.title}</a>
            </CardContent>
          </Card>
        ))}
      </ul>
    // <ul className="list-disc list-inside text-lg">
    //   {data.content.map((item: any, i: number) => (
    //     <li key={i}><a href={item.url} className="text-blue-600 hover:underline">{item.title}</a></li>
    //   ))}
    // </ul>
  )
}
  export default ContentBlock
  