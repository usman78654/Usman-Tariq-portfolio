import type { ProjectVideo as Video } from "@/content/project-videos";

export function ProjectVideo({ video }: { video: Video }) {
  return (
    <figure className="qa-recording project-recording">
      <span className="eyebrow">{video.kind}</span>
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.label}
        src={video.src}
      >
        <a href={video.src}>Open the walkthrough video</a>
      </video>
      <figcaption>
        <p>{video.description}</p>
        {video.steps.length > 0 && (
          <details>
            <summary>Read the visual workflow</summary>
            <ol>
              {video.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </details>
        )}
        <a className="text-link" href={video.src}>
          Open video in a separate tab
        </a>
      </figcaption>
    </figure>
  );
}
