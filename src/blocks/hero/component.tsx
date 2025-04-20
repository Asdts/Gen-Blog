"use client"

import { motion } from "framer-motion"
import { HeroBlockType } from "@/type/hero"

const HeroBlock = ({ data }: { data: HeroBlockType }) => {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <h1 className="text-5xl font-bold">{data.heading}</h1>
      {data.subheading && <p className="mt-4 text-xl">{data.subheading}</p>}
      {data.ctaText && data.ctaUrl && (
        <motion.a
          href={data.ctaUrl}
          whileHover={{ scale: 1.05 }}
          className="mt-6 inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow"
        >
          {data.ctaText}
        </motion.a>
      )}
    </section>
  )
}

export default HeroBlock

// import { HeroBlockType } from "@/type/hero"
// const HeroBlock = ({ data }: { data: HeroBlockType }) => (
//     <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
//       <h1 className="text-4xl font-bold">{data.heading}</h1>
//       {data.subheading && <p className="mt-2 text-xl">{data.subheading}</p>}
//       {data.ctaText && data.ctaUrl && (
//         <a href={data.ctaUrl} className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded shadow">
//           {data.ctaText}
//         </a>
//       )}
//     </section>
//   )
//   export default HeroBlock
  