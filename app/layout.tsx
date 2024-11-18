import "./globals.css";

export const metadata = {
  title: "Benjamin Pruitt Coding Assignment",
  description: "Tetris Game and Torus Knot 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 font-semibold text-white">
        <div className="container mx-auto h-screen">{children}</div>
      </body>
    </html>
  );
}
