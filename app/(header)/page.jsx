import CarouselHome from "../components/CarouselHome";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen pt-10">
      <section className="w-full h-full flex items-center justify-center flex-col gap-10">
        <div className="w-3/6 h-80">
          <CarouselHome />
        </div>
        <div className="h-48 text-center  flex flex-col justify-center gap-4">
          <h3 className="font-bold text-xl">All the skills you need in one place</h3>
          <p className="underline">Check some courses.</p>
        </div>
      </section>
    </main>
  );
}
