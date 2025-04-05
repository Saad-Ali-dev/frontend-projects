export default function Navbar() {
  return (
    <header>
      <nav className="bg-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 p-4 mx-4 my-2">
        <div className="container mx-auto flex items-center justify-center gap-8">
          <a
            href="/"
            className="text-base md:text-lg font-semibold hover:text-gray-500 transition-colors"
          >
            Home
          </a>
          <a
            href="/movies"
            className="text-base md:text-lg font-semibold hover:text-gray-500 transition-colors"
          >
            Movies
          </a>
          <a
            href="/pricing"
            className="text-base md:text-lg font-semibold hover:text-gray-500 transition-colors"
          >
            Pricing
          </a>
        </div>
      </nav>
    </header>
  );
}
