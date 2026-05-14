export const metadata = {
  title: "Investment Dashboard",
  description: "Minimal fintech dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
