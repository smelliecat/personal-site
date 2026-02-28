import Image from 'next/image'

interface FigureProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

/**
 * Use this in MDX blog posts to embed images and GIFs with optional captions.
 *
 * Example:
 *   <Figure
 *     src="/blog/my-post/result.gif"
 *     alt="Accuracy vs demo position"
 *     caption="Figure 1: Accuracy varies by demo placement across LLMs."
 *     width={800}
 *     height={450}
 *   />
 *
 * Place your files in:  public/blog/<post-slug>/your-file.gif
 * Reference them as:    /blog/<post-slug>/your-file.gif
 */
export function Figure({ src, alt, caption, width = 800, height = 500 }: FigureProps) {
  const isGif = src.toLowerCase().endsWith('.gif')

  return (
    <figure className="my-8 not-prose">
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto block"
          unoptimized={isGif}   // Next.js can't optimize animated GIFs
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-sm text-center text-slate-500 dark:text-slate-400 italic leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
