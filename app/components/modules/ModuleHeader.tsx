interface ModuleHeaderProps {
  title: string;
  description: string;
}

export function ModuleHeader({ title, description }: ModuleHeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{description}</p>
    </header>
  );
}
