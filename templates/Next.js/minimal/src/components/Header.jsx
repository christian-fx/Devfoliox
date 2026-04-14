"use client";

export default function Header({ profile }) {
  return (
    <header className="py-16 md:py-24 border-b border-slate-200">
      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-slate-400 mb-6 block font-semibold font-sans">
        Portfolio
      </span>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 md:mb-10 leading-[1.1] md:leading-[0.9]">
        {profile.name || profile.login}
      </h1>
      <p className="text-lg md:text-2xl lg:text-3xl text-slate-500 max-w-2xl font-sans font-light leading-relaxed">
        {profile.bio ||
          "Software Engineer crafting thoughtful digital experiences with clean code."}
      </p>

      <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 font-sans">
        <a
          href="#projects"
          className="bg-[#f85d5d] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#f85d5d] transition-colors text-center"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="bg-white border border-slate-200 px-8 py-4 rounded-lg font-medium hover:border-slate-400 transition-colors text-center"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
