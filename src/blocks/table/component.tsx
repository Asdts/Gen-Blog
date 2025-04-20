"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TableBlock = ({ data }: { data: any }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {data.headers.map((header: any, i: number) => (
              <TableHead key={i}>{header.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row: any, i: number) => (
            <TableRow key={i}>
              {data.headers.map((header: any, j: number) => (
                <TableCell key={j}>
                  {row[header.key]?.url ? (
                    <a
                      href={row[header.key].url}
                      className="text-blue-600 hover:underline"
                    >
                      {row[header.key].title}
                    </a>
                  ) : (
                    row[header.key]?.title || row[header.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableBlock


// const TableBlock = ({ data }: { data: any }) => {
//     return (
//     <table className="w-full border-collapse border border-gray-300">
//       <thead>
//         <tr>
//           {data.headers.map((header: any, i: number) => (
//             <th key={i} className="border p-2 bg-gray-200">{header.title}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.rows.map((row: any, i: number) => (
//           <tr key={i}>
//             <td className="border p-2">{row.url ? <a href={row.url}>{row.title}</a> : row.title}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )}
//   export default TableBlock
  