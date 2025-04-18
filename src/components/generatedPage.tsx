'use client'

import BlockRenderer from './BlockRender'

type Block = {
  type: string
  data: any
}

type Props = {
  data: {
    title: string
    blocks: Block[]
    childrenPages?: { _id: string; title: string }[]
  }
}

import Link from 'next/link'

const GeneratedPage = ({ data }: Props) => {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center">{data.title}</h1>

        {data.blocks.map((block, i) => (
          <BlockRenderer key={i} type={block.type} data={block.data} />
        ))}

        {data.childrenPages?.length > 0 && (
          <div className="mt-10 pt-4 border-t">
            <h2 className="text-2xl font-semibold">Other Pages</h2>
            <ul className="list-disc list-inside mt-2">
              {data.childrenPages.map(page => (
                <li key={page._id}>
                  <Link href={`/preview/${page._id}`} className="text-blue-600 hover:underline">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}

export default GeneratedPage
