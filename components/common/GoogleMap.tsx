import React from 'react';

interface GoogleMapProps {
  code: string;
}
export default function GoogleMap({ code }: GoogleMapProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: code }}
      className="h-60 lg:h-full [&>iframe]:size-full [&>iframe]:border-none"
    ></div>
  );
}
