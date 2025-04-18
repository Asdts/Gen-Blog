const FormBlock = ({ data }: { data: any }) => {
    const renderElement = (el: any) => (
      <div key={el.tagname} className="mb-4">
        <label className="block mb-1">{el.tagname}</label>
        <input
          type={el.attributes.find((a: any) => a.name === 'type')?.value || 'text'}
          className="w-full p-2 border border-gray-300 rounded"
          name={el.attributes.find((a: any) => a.name === 'name')?.value}
        />
      </div>
    )
  
    return (
      <form className="bg-gray-50 p-6 rounded-lg shadow-md">
        {data.formTag[0]?.children.map(renderElement)}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
    )
  }
  export default FormBlock
  