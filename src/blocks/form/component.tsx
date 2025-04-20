"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const FormBlock = ({ data }: { data: any }) => {
  console.log("FormBlock data:", data)
  const [formData, setFormData] = useState({})

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const renderElement = (el: any) => {
    const type = el.attributes.find((a: any) => a.name === "type")?.value || "text"
    const name = el.attributes.find((a: any) => a.name === "name")?.value || ""
    return (
      <div key={name} className="mb-4">
        <Label htmlFor={name} className="mb-1 block capitalize">
          {name}
        </Label>
        <Input
          id={name}
          type={type}
          name={name}
          onChange={handleChange}
          className="w-full"
        />
      </div>
    )
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg shadow-md max-w-xl mx-auto"
    >
      {data.formTag[0]?.children.map(renderElement)}
      <Button type="submit" className="mt-4 w-full">
        Submit
      </Button>
    </form>
  )
}

export default FormBlock

// const FormBlock = ({ data }: { data: any }) => {
//     const renderElement = (el: any) => (
//       <div key={el.tagname} className="mb-4">
//         <label className="block mb-1">{el.tagname}</label>
//         <input
//           type={el.attributes.find((a: any) => a.name === 'type')?.value || 'text'}
//           className="w-full p-2 border border-gray-300 rounded"
//           name={el.attributes.find((a: any) => a.name === 'name')?.value}
//         />
//       </div>
//     )
  
//     return (
//       <form className="bg-gray-50 p-6 rounded-lg shadow-md">
//         {data.formTag[0]?.children.map(renderElement)}
//         <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
//       </form>
//     )
//   }
//   export default FormBlock
  