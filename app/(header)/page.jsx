import CarouselHome from "../components/CarouselHome";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen pt-10">
      <section className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-3/6 h-80">
          <CarouselHome />
        </div>
        {/* <h3>All the skills you need in one place</h3>
        <p>Check some courses.</p> */}
      </section>
    </main>
  );
}
