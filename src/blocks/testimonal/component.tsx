import { TestimonialBlockType } from "@/type/testimonal"
const TestimonialBlock = ({ data }: { data: TestimonialBlockType }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.testimonials.map((t, i) => (
        <div key={i} className="bg-white p-6 shadow rounded">
          <p className="italic mb-2">"{t.quote}"</p>
          <div className="flex items-center space-x-3">
            {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />}
            <div>
              <p className="font-bold">{t.name}</p>
              {t.title && <p className="text-sm text-gray-500">{t.title}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
  export default TestimonialBlock
  