import React from 'react';
import classes from './style.module.css';

type ItemType = {
  id: number;
  image: string;
  label: string;
};

type ItemProps = {
  item: ItemType;
};

export default function ScrollItem({ item }: ItemProps) {
  return (
    <div
      className={classes.gallery_item}
      style={
        {
          background: `url(${item.image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          flexShrink: '0',
          width: '400px',
          height: '500px',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
        } as React.CSSProperties
      }
    >
      <div className="absolute bottom-8 left-8 z-10">
        <span className="font-azeret mb-2 block text-sm text-gray-100">
          0{item.id}
        </span>
        <h2 className="m-0 text-3xl font-semibold text-gray-100">
          {item.label}
        </h2>
      </div>
    </div>
  );
}
