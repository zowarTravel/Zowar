export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light">Checkout canceled</h1>
        <p className="mt-4 text-neutral-600">No worries — you can try again anytime.</p>

        <a
          href="/#booking"
          className="inline-flex mt-8 rounded-full border border-neutral-300 px-6 py-3 text-sm hover:bg-neutral-100 transition"
        >
          Back to booking
        </a>
      </div>
    </main>
  );
}
