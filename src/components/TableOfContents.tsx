'use client'

import { useEffect, useState } from 'react'

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const handleScroll = () => {
      // Offset from the top to determine active state (accounting for sticky header)
      const scrollPosition = window.scrollY + 120;

      // Find the current active heading
      let currentActiveId = '';

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        } else {
          break; // Headings are in document order, so we can stop checking
        }
      }

      // Default to the first heading if scrolled near the top
      if (!currentActiveId && headingElements.length > 0) {
        currentActiveId = headingElements[0].id;
      }

      setActiveId(currentActiveId);
    };

    // Initialize state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96; // height of fixed header + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL hash smoothly without jump
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <svg
          className="w-4 h-4 text-blue-900"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-gray-400">
          On this page
        </h3>
      </div>

      <div className="relative pl-0.5 border-l border-gray-100">
        <ul className="space-y-3.5 text-xs text-gray-500 font-medium">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            
            // Indent based on heading level
            let paddingLeft = 'pl-3';
            if (heading.level === 3) paddingLeft = 'pl-6';
            if (heading.level === 4) paddingLeft = 'pl-9';

            return (
              <li key={heading.id} className="relative">
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-[-1.5px] top-0 bottom-0 w-[2px] bg-blue-900 rounded-full" />
                )}
                
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleLinkClick(e, heading.id)}
                  className={`block transition-all duration-200 hover:text-blue-900 leading-normal ${paddingLeft} ${
                    isActive
                      ? 'text-blue-900 font-bold'
                      : 'text-gray-500/85 hover:translate-x-0.5'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
