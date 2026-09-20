export function Header({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6 hidden md:flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-library-graphite">{title}</h1>
      </div>
      {children && (
        <div className="flex items-center gap-4">
          {children}
        </div>
      )}
    </header>
  );
}
