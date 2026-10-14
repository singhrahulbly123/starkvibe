import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function Breadcrumbs({
  items,
  dark = false,
  className = "",
  emitJsonLd = true,
  compact = false,
}: {
  items: BreadcrumbItem[];
  dark?: boolean;
  className?: string;
  emitJsonLd?: boolean;
  compact?: boolean;
}) {
  return (
    <>
      {emitJsonLd && <JsonLd data={breadcrumbJsonLd(items)} />}
      <div className={`${dark ? "w-full bg-ink" : ""} ${className}`}>
        <div className={`mx-auto max-w-[1400px] px-5 lg:px-12 ${compact ? "pt-0" : "pt-[80px] lg:pt-[92px]"}`}>
          <nav
            aria-label="Breadcrumb"
            className={`inline-flex items-center gap-2 border px-3.5 py-2.5 text-[11px] font-semibold tracking-[.12em] uppercase ${dark ? "border-paper/15 bg-paper/5 text-paper shadow-none" : "border-ink/10 bg-[#eeece5]/65 text-[#6b6961] shadow-[0_6px_18px_rgba(13,13,12,.04)]"}`}
          >
            {items.map((item, index) => (
              <span key={item.path} className="inline-flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className={dark ? "text-paper/45" : "text-ink/35"}
                  />
                )}
                {index === items.length - 1 ? (
                  <span className={`flex items-center gap-2 ${dark ? "text-paper" : "text-ink"}`} aria-current="page">
                    {index === 0 && <House size={14} strokeWidth={1.8} />}
                    {index > 0 && <span className="size-1.5 rounded-full bg-olive" />}
                    <span>{item.name}</span>
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 transition-colors ${dark ? "hover:text-gold" : "hover:text-olive"}`}
                  >
                    {index === 0 && <House size={14} strokeWidth={1.8} />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
