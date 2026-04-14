export default function Footer({ profile, isMobile }) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">
          © {new Date().getFullYear()} {profile.name || profile.login}
        </span>
        <div className="flex items-center gap-4">
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors"
          >
            @{profile.login}
          </a>
        </div>
      </div>
      <div className="text-center mt-6">
        <a
          href="https://github.com/christian-fx/Devfolio"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] text-slate-700 hover:text-slate-500 tracking-widest transition-colors"
        >
          Powered by Devfolio
        </a>
      </div>
    </footer>
  );
}
