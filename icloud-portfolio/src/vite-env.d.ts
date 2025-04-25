/// <reference types="vite/client" />

// 为常见静态资源类型添加声明
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// 允许导入JSON文件
declare module '*.json' {
  const content: any;
  export default content;
}

// 允许导入.js文件
declare module '*.js' {
  const content: any;
  export default content;
  export const blogData: any;
}
