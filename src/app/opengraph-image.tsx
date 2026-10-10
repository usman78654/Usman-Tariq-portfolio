import { ImageResponse } from "next/og";
export const alt =
  "Usman Tariq — Software Engineer. Useful software, intelligent tools, reliable systems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#161815",
        width: "100%",
        height: "100%",
        padding: 70,
        color: "#f0f0e7",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
          color: "#c4f562",
        }}
      >
        <span>ut.</span>
        <span>SOFTWARE · AI · CLOUD · QUALITY</span>
      </div>
      <div
        style={{
          fontSize: 82,
          letterSpacing: -5,
          lineHeight: 1.1,
          marginTop: 70,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Complex things.</span>
        <span style={{ color: "#c4f562" }}>Made understandable.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
          marginTop: 60,
        }}
      >
        <span>Usman Tariq / Software Engineer</span>
        <span>Islamabad, Pakistan</span>
      </div>
    </div>,
    size,
  );
}
