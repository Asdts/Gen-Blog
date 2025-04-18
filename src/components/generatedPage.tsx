// components/GeneratedPage.tsx
'use client'

import React from 'react'
import HeaderBlock from '@/blocks/header/component'
import DropBlock from '@/blocks/dropBlock/component'
import ContentBlock from '@/blocks/content/component'
import MediaBlock from '@/blocks/mediaBlock/component'
import FormBlock from '@/blocks/form/component'
import FooterBlock from '@/blocks/footer/component'
import CodeBlock from '@/blocks/code/component'
import TableBlock from '@/blocks/table/component'

type Props = {
  data: {
    title: string
    header: any
    dropBlock: any
    content: any
    mediaBlock: any
    form: any
    footer: any
    code: any
    table: any
  }
}

const GeneratedPage = ({ data }: Props) => {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <HeaderBlock data={data.header} />
      <DropBlock data={data.dropBlock} />
      <section className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center">{data.title}</h1>
        <ContentBlock data={data.content} />
        <MediaBlock data={data.mediaBlock} />
        <TableBlock data={data.table} />
        <FormBlock data={data.form} />
        <CodeBlock data={data.code} />
      </section>
      <FooterBlock data={data.footer} />
    </main>
  )
}

export default GeneratedPage
