interface BrandTagProps {
  label: string
}

export function BrandTag({ label }: BrandTagProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2px 8px', // Standardized horizontal padding
        backgroundColor: 'rgba(255,255,255,0.12)',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 7,
          fontWeight: 400,
          color: '#FFFFFF', // Pure white text everywhere
          textTransform: 'uppercase',
          letterSpacing: '0.14px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  )
}
