export type FormBlockType = {
    formTag: {
      tagname: string;
      attributes: {
        name: string;
        value: string;
      }[];
      children: {
        tagname: string;
        attributes: {
          name: string;
          value: string;
        }[];
        children: {
          tagname: string;
          attributes: {
            name: string;
            value: string;
          }[];
        }[];
      }[];
    }[];
  }
  