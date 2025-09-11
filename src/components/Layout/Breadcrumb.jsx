import React from "react";

const Breadcrumb = ({ items = [] }) => {
  const defaultItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard V2", href: "/dashboard", active: true },
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav
      className="flex items-center gap-2 text-sm mb-4"
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-400"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
          {item.active ? (
            <span
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <a
              href={item.href}
              className="hover:underline transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
