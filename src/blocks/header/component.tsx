import Link from "next/link"
const HeaderBlock = ({ data }: { data: any }) =>{ 
    return (

      <header className="sticky top-0 z-50 bg-primary text-primary-foreground p-4 flex justify-between">
          <h2 className="text-lg font-bold">Website Header</h2>
          <nav className="space-x-4">
          {data.navigator.map((item: any, i: number) => (
          <Link key={i} href={item.url} className="hover:underline">{item.title}</Link>
        ))}
          </nav>
      </header>

    // <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    //   <h2 className="text-lg font-bold">Website Header</h2>
    //   <nav className="space-x-4">
    //     {data.navigator.map((item: any, i: number) => (
    //       <a key={i} href={item.url} className="hover:underline">{item.title}</a>
    //     ))}
    //   </nav>
    // </header>
  )}
  export default HeaderBlock
  