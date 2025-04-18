const FooterBlock = ({ data }: { data: any }) => {
    return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      {data.navigator.map((item: any, i: number) => (
        <a key={i} href={item.url} className="mx-2 hover:underline">{item.title}</a>
      ))}
    </footer>
  )}
  export default FooterBlock
  