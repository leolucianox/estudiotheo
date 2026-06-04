import { artist } from "@/lib/artist-data";
import { stripAccents } from "@/lib/text";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 md:pl-44">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-cond text-lg font-bold uppercase tracking-wide text-fg">
          {stripAccents(artist.name)}
        </p>

        <ul className="flex flex-wrap gap-6">
          {artist.social.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-cond text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-cond text-xs font-medium uppercase tracking-[0.18em] text-muted">
          © {year} — São Paulo
        </p>
      </div>
    </footer>
  );
}
