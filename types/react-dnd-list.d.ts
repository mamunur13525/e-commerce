declare module 'react-dnd-list' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface DndListProps<T> {
    data: T[];
    onReorder: (fromIndex: number, toIndex: number) => void;
    renderItem: (item: T, index: number) => ReactNode;
    className?: string;
    itemClassName?: string;
    dragHandleClassName?: string;
  }
  
  export const DndList: <T>(props: DndListProps<T>) => ReactNode;
}
