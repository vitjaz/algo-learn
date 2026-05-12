import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Algo Learn";
  const description =
    searchParams.get("desc") ||
    "Изучайте алгоритмы через интерактивные визуализации";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0f172a",
        backgroundImage:
          "radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
      }}
    >
      {/* Decorative grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          opacity: 0.03,
        }}
      >
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 100,
              height: 100,
              borderRight: "1px solid white",
              borderBottom: "1px solid white",
            }}
          />
        ))}
      </div>

      {/* Badge */}
      <div
        style={{
          display: "flex",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 9999,
            border: "1px solid rgba(139, 92, 246, 0.3)",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span
            style={{
              fontSize: 16,
              color: "#c4b5fd",
              fontWeight: 500,
            }}
          >
            Интерактивные визуализации
          </span>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: title.length > 30 ? 52 : 64,
          fontWeight: 700,
          color: "white",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#94a3b8",
          lineHeight: 1.5,
          maxWidth: 800,
        }}
      >
        {description}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 40,
          borderTop: "1px solid rgba(148, 163, 184, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
              <path d="m21 8-4-4-4 4" />
              <path d="M17 4v16" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "white",
            }}
          >
            Algo Learn
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          {["Бинарный поиск", "Сортировка", "Визуализация"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 16,
                color: "#64748b",
                padding: "6px 14px",
                borderRadius: 6,
                backgroundColor: "rgba(100, 116, 139, 0.1)",
                border: "1px solid rgba(100, 116, 139, 0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
