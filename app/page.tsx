import StarField from "@/components/StarField";
import PantheonScroll from "@/components/PantheonScroll";
import HermesWorld from "@/components/HermesWorld";

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

        <div className="hermes-world">
  <div className="hermes-glow" />

  <div className="hermes-planet">
  <HermesWorld />
</div>
  <div className="hermes-ring" />
  <div className="hermes-label">
    <span>HERMES</span>
    <small>The first question.</small>
  </div>
</div>
      </section>
    </main>
  );
}