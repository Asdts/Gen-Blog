import { FeatureBlockType } from "@/type/feature";
import { Card } from "@/components/ui/card";


const FeatureBlock = ({ data }: { data: FeatureBlockType }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.features.map((f, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl mb-2">{f.icon}</div>
              <h4 className="text-xl font-semibold">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </Card>
        // <div key={i} className="p-4 bg-white shadow rounded text-center">
        //   {f.icon && <div className="text-4xl mb-2">{f.icon}</div>}
        //   <h4 className="text-xl font-semibold">{f.title}</h4>
        //   {f.description && <p className="text-sm text-gray-600">{f.description}</p>}
        // </div>
      ))}
    </div>
  )
  export default FeatureBlock
  