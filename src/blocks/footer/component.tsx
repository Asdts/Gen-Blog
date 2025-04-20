import Link from "next/link"
const FooterBlock = ({ data }: { data: any }) => {
    return (

      <footer className="bg-muted text-muted-foreground p-4 text-center space-x-4">
        {data.navigator.map((item, i) => (
          <Link key={i} href={item.url} className="hover:underline underline-offset-4">{item.title}</Link>
        ))}
      </footer>

    // <footer className="bg-gray-800 text-white p-4 text-center">
    //   {data.navigator.map((item: any, i: number) => (
    //     <a key={i} href={item.url} className="mx-2 hover:underline">{item.title}</a>
    //   ))}
    // </footer>
  )}
  export default FooterBlock
  