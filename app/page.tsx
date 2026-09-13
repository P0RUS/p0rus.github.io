import StarField from "@/components/StarField";
import PantheonScroll from "@/components/PantheonScroll";

export default function Home() {
  return (
    <main className="pantheon">
      <PantheonScroll />

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

      <section className="orbit-scene" aria-label="The Pantheon">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />

        <div className="hermes-placeholder">
          <span>HERMES</span>
          <small>The first question.</small>
        </div>
      </section>
    </main>
  );
}