export default function Footer({ profile }) {
  return (
    <footer className="py-12 text-center border-t border-slate-200 font-sans">
      <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">
        © {new Date().getFullYear()} {profile.name || profile.login}. All rights
        reserved.
      </div>
      <a
        href="https://github.com/christian-fx/Devfolio"
        target="_blank"
        rel="noreferrer"
        className="text-[10px] text-slate-300 hover:text-slate-400 transition-colors uppercase tracking-widest block mt-4"
      >
        Powered by Devfolio
      </a>
    </footer>
  );
}
