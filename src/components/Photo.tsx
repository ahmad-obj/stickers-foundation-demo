type PhotoProps = {
  slug: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const dimensions: Record<string, [number, number]> = {
  'solid-color-vinyl-sheet-selection': [1200, 795],
  'patterned-vinyl-roll-selection': [640, 640],
  'marble-effect-vinyl-roll-selection': [1600, 1200],
  'scooter-pop-art-vinyl-wrap': [1200, 1600],
  'cheezy-burger-and-shake-cutout-sign': [3024, 4032],
};

export function Photo({ slug, alt, width: suppliedWidth, height: suppliedHeight, sizes = '(max-width: 767px) 100vw, 50vw', priority = false, className }: PhotoProps) {
  const [naturalWidth, naturalHeight] = dimensions[slug] ?? [4032, 3024];
  const width = suppliedWidth ?? naturalWidth;
  const height = suppliedHeight ?? naturalHeight;
  const variants = [...new Set([480, 800, 1200, 1600, ...(width < 1600 ? [width] : [])])].filter(size => size <= width).sort((a, b) => a - b);
  const defaultWidth = variants.includes(800) ? 800 : variants[0];
  return <img
    className={className}
    src={`/images/${slug}-${defaultWidth}.webp`}
    srcSet={variants.map(size => `/images/${slug}-${size}.webp ${size}w`).join(', ')}
    sizes={sizes}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    decoding="async"
  />;
}
