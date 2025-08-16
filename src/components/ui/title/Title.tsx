import { ReactNode } from "react";
import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  /** Ícono opcional. Ej: <FaCart size={18}/> */
  icon?: ReactNode;
  /** Muestra una línea delicada debajo del componente */
  showDivider?: boolean; // default: true
}

// Ícono por defecto (no requiere librerías externas)
const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden
  >
    <path d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm0 4.5a.75.75 0 01.75.75v4.19l3.03 1.75a.75.75 0 11-.75 1.3l-3.41-1.98a.75.75 0 01-.37-.65V7.5A.75.75 0 0112 6.75z" />
  </svg>
);

export const Title = ({
  title,
  subtitle,
  className = "",
  icon,
  showDivider = true,
}: Props) => {
  const IconNode = icon ?? <DefaultIcon />;

  return (
    <div className={["mt-3", className].filter(Boolean).join(" ")}>
      <div className="flex items-start gap-3">
        {/* Contenedor de ícono */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200">
          {IconNode}
        </div>

        {/* Títulos */}
        <div className="min-w-0">
          <h1
            className={`${titleFont.className} antialiased text-2xl font-semibold leading-tight`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-zinc-500">{subtitle}</p>
          )}
        </div>
      </div>

      {showDivider && (
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent" />
      )}
    </div>
  );
};

export default Title;
