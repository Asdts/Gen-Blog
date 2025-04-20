import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const MediaBlock = ({ data }: { data: any }) => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.type.map((item: any, i: number) => (
        <div key={i}>
          {item.type === 'image' ? (
            <AspectRatio ratio={16 / 9}>
              <img src={item.media.url} className="rounded shadow" alt={item.media.alt}/>
            </AspectRatio>
            // <img src={item.media.url} alt={item.media.alt} className="rounded shadow" />
          ) : (
            <video controls width={item.attributes.width}>
              <source src={item.media.url} />
              {item.media.alt}
            </video>
          )}
        </div>
      ))}
    </div>
  )}
  export default MediaBlock
  