// src/components/StarRating.tsx
import googleWord from "@/assets/google/google-word.png";

interface StarRatingProps {
  reviewCount?: number;
  reviewUrl?: string;
}

export default function StarRating({
  reviewCount = 1076,
  reviewUrl = "/#testimonials",
}: StarRatingProps) {
  return (
    <a
      href={reviewUrl}
      className="inline-flex items-center gap-3 rounded px-1 py-1 transition-opacity hover:opacity-85"
      aria-label={`Excellent — ${reviewCount.toLocaleString()} reviews on Google`}
    >
      <span className="text-sm font-black uppercase tracking-widest text-white drop-shadow">
        Excellent
      </span>

      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="h-6 w-6 text-yellow-400 drop-shadow"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <span className="text-sm font-semibold text-white drop-shadow">
        {reviewCount.toLocaleString()} reviews
      </span>

      <img
        src={googleWord.src}
        alt="Google"
        className="h-5 w-auto translate-y-[1px]"
        loading="eager"
        decoding="async"
      />
    </a>
  );
}
