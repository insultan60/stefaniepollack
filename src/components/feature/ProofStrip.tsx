/* The three headline figures under the buyers and sellers intros, in the same
   strip style the neighborhood pages use. Same figures as the home page; update
   them in one place here once the client confirms the year. */
const PROOF = ["20+ Years Experience", "$500M+ in Sales", "800+ Families Helped"];

export default function ProofStrip() {
  return (
    <ul className="mt-16 md:mt-20 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-background-200 rounded-xl overflow-hidden border border-background-200">
      {PROOF.map((item) => (
        <li
          key={item}
          className="bg-background-50 px-4 py-6 text-center text-xs md:text-sm font-medium tracking-wide uppercase text-foreground-800"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
