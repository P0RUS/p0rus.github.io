import StarField from "@/components/StarField";

export default function Home() {
  return (
    <main className="pantheon">
      <section className="threshold">
        <StarField />

        <div className="threshold-content">
          <p className="welcome">WELCOME TO</p>

          <h1>PANTHEON</h1>

          <p className="subtitle">
            A collection of things I couldn&apos;t stop wondering about.
          </p>

          <div className="scroll-cue" aria-hidden="true">
            <span>↓</span>
          </div>
        </div>
      </section>
    </main>
  );
}