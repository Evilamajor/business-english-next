import { BusinessEnglishSidebar } from "@/app/components/navigation/BusinessEnglishSidebar";

export default function BusinessEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl gap-8 px-4 py-10 md:px-6 md:py-12">
      <aside className="w-full max-w-sm space-y-4 lg:max-w-xs">
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Business English</h1>
        <BusinessEnglishSidebar />
      </aside>

      <section className="min-w-0 flex-1 rounded-[20px] border border-white/20 bg-white/95 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-10">
        {children}
      </section>
    </main>
  );
}
