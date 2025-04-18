const TableBlock = ({ data }: { data: any }) => {
    return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {data.headers.map((header: any, i: number) => (
            <th key={i} className="border p-2 bg-gray-200">{header.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any, i: number) => (
          <tr key={i}>
            <td className="border p-2">{row.url ? <a href={row.url}>{row.title}</a> : row.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  export default TableBlock
  