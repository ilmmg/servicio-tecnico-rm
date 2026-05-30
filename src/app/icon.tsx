import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0f1a 0%, #111827 100%)",
          borderRadius: "14px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Snowflake symbol */}
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            lineHeight: 1,
            marginBottom: "-2px",
            color: "#60a5fa",
            filter: "drop-shadow(0 0 6px rgba(96,165,250,0.5))",
          }}
        >
          ❄
        </div>

        {/* RM text */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            fontWeight: 900,
            letterSpacing: "-0.5px",
            color: "#ffffff",
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          RM
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
