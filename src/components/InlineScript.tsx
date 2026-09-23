'use client';

// Helper sesuai panduan resmi Next.js "Preventing flash before hydration".
// - Server render: type="text/javascript" -> browser mengeksekusi script
//   saat parsing HTML, sebelum first paint (anti theme-flash).
// - Client render: type="text/plain" -> script inert (data block), sehingga
//   React tidak melempar warning "Encountered a script tag...".
// suppressHydrationWarning menoleransi perbedaan atribut type tersebut.
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
