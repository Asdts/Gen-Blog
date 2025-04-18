// utils/getModelByType.ts
import CodeModel from '@/model/code'
import ContentModel from '@/model/content'
import DropBlockModel from '@/model/dropBlock'
import FooterModel from '@/model/footer'
import FormModel from '@/model/form'
import HeaderModel from '@/model/header'
import MediaBlockModel from '@/model/mediaBlock'
import JsonToTableModel from '@/model/table'
import ParagraphModel from '@/model/paragraph'
import HeroModel from '@/model/hero'
import TestimonialModel from '@/model/testimonal'
import FeatureModel from '@/model/feature'

export function getModelByType(type: string) {
  switch (type) {
    case 'code': return CodeModel
    case 'content': return ContentModel
    case 'dropBlock': return DropBlockModel
    case 'footer': return FooterModel
    case 'form': return FormModel
    case 'header': return HeaderModel
    case 'mediaBlock': return MediaBlockModel
    case 'table': return JsonToTableModel
    case 'paragraph': return ParagraphModel
    case 'hero': return HeroModel
    case 'testimonial': return TestimonialModel
    case 'feature': return FeatureModel
    default: throw new Error('Unsupported block type: ' + type)
  }
}
