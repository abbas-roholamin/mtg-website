import Link from 'next/link';

export default function WhatsAppButton() {
  // Use full international format WITHOUT spaces or symbols
  const phoneNumber = '35797757277';
  const message = encodeURIComponent('Hello, I have a question!');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg hover:bg-green-600"
    >
      Chat on WhatApp
    </Link>
  );
}
