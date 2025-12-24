import { Link } from "react-router-dom";

interface Breadcrumb {
  title: string;
  slug: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length === 0) return null;

  return (
    <nav
      className="flex flex-wrap text-sm sm:text-base mt-1.5 mb-7.5 sm:mt-7.5"
      aria-label="breadcrumb"
    >
      {breadcrumbs.map((crumb, index) => {
        if (!crumb || !crumb.title || !crumb.slug) return null;

        const isLast = index === breadcrumbs.length - 1;
        const to = `/${crumb.slug.replace(/^\/+/, "")}`;

        return (
          <span key={crumb.slug} className="flex items-center">
            {!isLast ? (
              <>
                <Link
                  to={to}
                  className="text-grayscale-700 font-medium ag-h12 sm:ag-h9 hover:text-black"
                >
                  {crumb.title}
                </Link>
                <span className="text-grayscale-700 text-[12px] mx-2">/</span>
              </>
            ) : (
              <span className="text-grayscale-700 font-medium ag-h12 sm:ag-h9">
                {crumb.title}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
