export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto flex min-h-screen w-full flex-col overflow-auto md:flex-row">
      {children}
    </div>
  );
}
