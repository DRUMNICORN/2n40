// // nodeUtils.ts
// import { Node } from 'vis-network';
// import { Content } from '@/app/types';
// import { getColorBackground } from './color';

// export const generateNode = (file: Content, id: number): Node => {
//   return {
//     id,
//     label: file.name,
//     title: `Node: ${id}, Name: ${file.name}`,

//     color: {
//       background: getColorBackground(file.category || '', 42),
//       border: id == 0 ? '#ffffff' : '#000000',
//       highlight: {
//         background: '#420000',
//         border: '#ffffff',
//       },
//       hover: {
//         background: getColorBackground(file.category || ''),
//       },
//     },
//     level: Math.round(Math.random() * 10),
//     shape: getShape(file.category || ''),
//     size: id == 0 ? 20 : 10,
//     borderWidth: 3,
//     // id== 0 is center
//     fixed: id == 0 ? true : false,
//   } as Node;

// };

// const getShape = (category: string): string => {
//   switch (category) {
//     case 'concepts':
//       return 'diamond';
//     case 'creatives':
//         return 'dot';
//     case 'collectives':
//       return 'box';
//     case 'collaborations':
//       return 'box';
//     default:
//       return 'text';
//   }
// };

