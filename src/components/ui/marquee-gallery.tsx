import { Marquee } from '@/components/ui/marquee'

import { cn } from '@/lib/utils'

type MarqueeGalleryProps = {
  images: string[]
  className?: string
  rows?: number
  tilesPerRow?: number
  tileWidth?: number
  gap?: number
  borderRadius?: string
  borderWidth?: number
  borderColor?: string
  durationSeconds?: number
  overlayColor?: string
  fadeOpacity?: number
}

const MarqueeGallery = ({
  images,
  className,
  rows = 5,
  tilesPerRow = 8,
  tileWidth = 190,
  gap = 0,
  borderRadius = '0px',
  borderWidth = 6,
  borderColor = '#ffffff',
  durationSeconds = 34,
  overlayColor = '#120F17',
  fadeOpacity = 0.55
}: MarqueeGalleryProps) => {
  const rowsData = Array.from({ length: rows }, (_, r) => ({
    reverse: r % 2 === 1,
    duration: durationSeconds + (r % 3) * 5,
    tiles: Array.from({ length: tilesPerRow }, (_, i) => images[(r * tilesPerRow + i) % images.length])
  }))

  return (
    <div className={cn('relative flex size-full flex-col justify-center overflow-hidden', className)}>
      {rowsData.map((row, r) => (
        <div key={r} className='min-h-0 flex-1 overflow-hidden'>
          <Marquee duration={row.duration} gap={gap} reverse={row.reverse} repeat={2} className='h-full p-0'>
            {row.tiles.map((src, i) => (
              <div
                key={i}
                className='shrink-0 overflow-hidden bg-gray-200'
                style={{ width: tileWidth, borderRadius, border: `${borderWidth}px solid ${borderColor}` }}
              >
                <img
                  src={src}
                  alt=''
                  aria-hidden='true'
                  draggable={false}
                  loading='lazy'
                  className='pointer-events-none size-full object-cover'
                />
              </div>
            ))}
          </Marquee>
        </div>
      ))}

      <div
        className='pointer-events-none absolute inset-y-0 left-0 w-1/6'
        style={{
          background: `linear-gradient(to right, color-mix(in oklab, ${overlayColor} ${fadeOpacity * 100}%, transparent), transparent)`
        }}
      />
      <div
        className='pointer-events-none absolute inset-y-0 right-0 w-1/6'
        style={{
          background: `linear-gradient(to left, color-mix(in oklab, ${overlayColor} ${fadeOpacity * 100}%, transparent), transparent)`
        }}
      />
    </div>
  )
}

export default MarqueeGallery
