import React from 'react';

interface GoogleMapProps {
  code: string;
}
export default function GoogleMap({ code }: GoogleMapProps) {
  return (
    <div>
      <iframe
        src={code}
        style={{ border: 0, width: '100%', height: '100%' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
