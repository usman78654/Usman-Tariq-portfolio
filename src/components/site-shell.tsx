import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Usman Tariq home">
        ut<span>.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/projects">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#resume">CVs</Link>
      </nav>
      <a className="header-contact" href={`mailto:${profile.email}`}>
        Let's talk <ArrowUpRight size={16} />
      </a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="brand">
        ut<span>.</span>
      </Link>
      <p>Built with curiosity. Based in Islamabad.</p>
      <div>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={14} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight size={14} />
        </a>
        <a href={`mailto:${profile.email}`}>
          Email <ArrowUpRight size={14} />
        </a>
      </div>
      <span>© {new Date().getFullYear()} Usman Tariq</span>
    </footer>
  );
}
