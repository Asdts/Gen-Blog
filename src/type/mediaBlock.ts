export type MediaBlockType = {
    type: {
      type: 'image' | 'video';
      media: {
        url: string;
        alt: string;
      };
      attributes: {
        height?: number;
        width?: number;
      };
    }[];
  }
  