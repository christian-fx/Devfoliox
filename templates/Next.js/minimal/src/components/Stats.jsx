"use client";

export default function Stats({ profile }) {
  return (
    <section
      id="about"
      className="py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 border-b border-slate-200"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-medium mb-6 md:mb-10 tracking-tight">
          About
        </h2>
        <p className="text-lg md:text-xl text-slate-500 font-sans leading-relaxed">
          I'm a developer with a passion for building live, data-driven
          applications. Currently active on GitHub with {profile.public_repos}{" "}
          public projects.
        </p>
      </div>
      <div className="font-sans">
        <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold block mb-6 md:mb-8">
          GitHub Stats
        </span>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b border-slate-100 pb-4">
            <span className="text-slate-500">Followers</span>
            <span className="font-medium text-black">{profile.followers}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-4">
            <span className="text-slate-500">Following</span>
            <span className="font-medium text-black">{profile.following}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-4">
            <span className="text-slate-500">Repositories</span>
            <span className="font-medium text-black">
              {profile.public_repos}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
