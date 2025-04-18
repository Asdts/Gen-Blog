// app/preview/[id]/page.tsx
import connectDB from '@/connection/dbConn'
import MainModel from '@/model/main'
import CodeModel from '@/model/code'
import ContentModel from '@/model/content'
import DropBlockModel from '@/model/dropBlock'
import FooterModel from '@/model/footer'
import FormModel from '@/model/form'
import HeaderModel from '@/model/header'
import MediaBlockModel from '@/model/mediaBlock'
import JsonToTableModel from '@/model/table'
import GeneratedPage from '@/components/generatedPage'

export default async function PreviewPage({ params }: { params: { id: string } }) {
  await connectDB()

  const main = await MainModel.findById(params.id).lean() as { code: string; content: string; dropBlock: string; footer: string; form: string; header: string; mediaBlock: string; table: string; title: string } | null

    if (!main) {
        return <div>Page not found</div>
    }

  const [code, content, dropBlock, footer, form, header, mediaBlock, table] = await Promise.all([
    CodeModel.findById(main.code),
    ContentModel.findById(main.content),
    DropBlockModel.findById(main.dropBlock),
    FooterModel.findById(main.footer),
    FormModel.findById(main.form),
    HeaderModel.findById(main.header),
    MediaBlockModel.findById(main.mediaBlock),
    JsonToTableModel.findById(main.table)
  ])

  const data = {
    title: main.title,
    code,
    content,
    dropBlock,
    footer,
    form,
    header,
    mediaBlock,
    table
  }

  return <GeneratedPage data={JSON.parse(JSON.stringify(data))} />
}
