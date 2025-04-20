import connectDB from '@/connection/dbConn'
import MainModel from '@/model/main'
import { models } from '@/utils/block-config'
import GeneratedPage from '@/components/generatedPage'
// import NavigationLink from '@/components/navigationLink'
import NavigationLinkWithSession from '@/components/navigationLinkWithSession'

export default async function PreviewPage({ params }: { params: { id: string } }) {
  await connectDB()

  const main = await MainModel.findById(params.id)
    .populate('childrenPages', 'title')
    .lean()

  if (!main) return <div className="text-center text-red-600 mt-12">Page not found</div>

  const blockData = await Promise.all(
    main.blocks.map(async (block: any) => {
      const data = await models[block.type].findById(block.refId).lean()
      return { type: block.type, data }
    })
  )

  const data = {
    title: main.title,
    blocks: blockData,
    childrenPages: main.childrenPages
  }

  return (
    <>
      <GeneratedPage data={JSON.parse(JSON.stringify(data))} />

      {!main.childrenPages?.length && (
        <div className="text-center mt-4 space-y-2">
          {["About", "Resources", "FAQ"].map((label) => (
            <NavigationLinkWithSession
              key={label}
              title={label}
              topic={`${label} page for ${main.title}`}
              parentId={main._id.toString()}
              // sessionId={localStorage.getItem('sessionId') || crypto.randomUUID()}
            />
          ))}
        </div>
      )}
    </>
  )
}