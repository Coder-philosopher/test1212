// Generate random skin condition images as SVG data URIs (no CORS issues)
export function generateMockSkinImage(type = "default"): string {
  const skinTones = ["#D4A574", "#C9997E", "#D9A78D", "#E8B9A1", "#C29A7A"]
  const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)]

  // Different skin condition visualizations
  const conditions = [
    // Psoriasis-like pattern
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <circle cx="80" cy="60" r="35" fill="#D47B7B" opacity="0.7"/>
      <circle cx="120" cy="80" r="28" fill="#C96B6B" opacity="0.6"/>
      <circle cx="150" cy="50" r="32" fill="#D47B7B" opacity="0.65"/>
      <circle cx="100" cy="120" r="25" fill="#E5A0A0" opacity="0.5"/>
      <circle cx="200" cy="100" r="38" fill="#D47B7B" opacity="0.7"/>
      <circle cx="250" cy="130" r="30" fill="#C96B6B" opacity="0.6"/>
      <circle cx="180" cy="200" r="35" fill="#D47B7B" opacity="0.65"/>
      <text x="10" y="280" font-size="12" fill="#333">Psoriasis Assessment</text>
    </svg>`,

    // Eczema-like inflamed areas
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <ellipse cx="100" cy="100" rx="60" ry="50" fill="#E8947C" opacity="0.7"/>
      <ellipse cx="150" cy="150" rx="70" ry="55" fill="#D97C6B" opacity="0.65"/>
      <ellipse cx="250" cy="120" rx="50" ry="45" fill="#E8947C" opacity="0.6"/>
      <path d="M 50 200 Q 100 220 150 210 T 250 200" stroke="#B85C5C" stroke-width="3" fill="none" opacity="0.5"/>
      <text x="10" y="280" font-size="12" fill="#333">Eczema Inflammation</text>
    </svg>`,

    // Dermatitis with texture
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <rect x="50" y="50" width="300" height="200" fill="#F0B5A8" opacity="0.6" rx="8"/>
      <circle cx="80" cy="90" r="15" fill="#D47B7B" opacity="0.8"/>
      <circle cx="120" cy="110" r="12" fill="#C96B6B" opacity="0.7"/>
      <circle cx="160" cy="85" r="18" fill="#D47B7B" opacity="0.75"/>
      <circle cx="200" cy="120" r="14" fill="#E5A0A0" opacity="0.7"/>
      <circle cx="240" cy="100" r="16" fill="#D47B7B" opacity="0.8"/>
      <circle cx="100" cy="180" r="13" fill="#C96B6B" opacity="0.7"/>
      <circle cx="180" cy="200" r="15" fill="#D47B7B" opacity="0.75"/>
      <text x="10" y="280" font-size="12" fill="#333">Dermatitis Pattern</text>
    </svg>`,

    // Fungal infection
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <circle cx="150" cy="120" r="80" fill="#C9997E" stroke="#8B6F47" stroke-width="2" opacity="0.7"/>
      <circle cx="130" cy="100" r="25" fill="#D4A574" opacity="0.8"/>
      <circle cx="170" cy="110" r="22" fill="#D4A574" opacity="0.8"/>
      <circle cx="150" cy="150" r="28" fill="#D4A574" opacity="0.8"/>
      <circle cx="110" cy="130" r="20" fill="#C9997E" opacity="0.7"/>
      <circle cx="190" cy="140" r="23" fill="#C9997E" opacity="0.7"/>
      <path d="M 80 150 Q 100 160 120 150" stroke="#8B6F47" stroke-width="2" fill="none"/>
      <path d="M 180 160 Q 200 170 220 160" stroke="#8B6F47" stroke-width="2" fill="none"/>
      <text x="10" y="280" font-size="12" fill="#333">Fungal Infection</text>
    </svg>`,

    // Melanoma assessment
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <circle cx="150" cy="120" r="70" fill="#2D2D2D" opacity="0.8"/>
      <circle cx="140" cy="110" r="35" fill="#3D3D3D" opacity="0.7"/>
      <ellipse cx="165" cy="100" rx="25" ry="30" fill="#1D1D1D" opacity="0.75"/>
      <circle cx="150" cy="135" r="20" fill="#2D2D2D" opacity="0.85"/>
      <circle cx="130" cy="125" r="15" fill="#3D3D3D" opacity="0.7"/>
      <path d="M 85 120 L 95 125 L 90 135" stroke="#000" stroke-width="2" fill="none" opacity="0.6"/>
      <text x="10" y="280" font-size="12" fill="#333">Melanoma Assessment</text>
    </svg>`,

    // Acne with scarring
    `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="${skinTone}"/>
      <circle cx="100" cy="80" r="18" fill="#D47B7B" opacity="0.8"/>
      <circle cx="150" cy="70" r="22" fill="#C96B6B" opacity="0.75"/>
      <circle cx="200" cy="90" r="16" fill="#D47B7B" opacity="0.8"/>
      <circle cx="120" cy="150" r="20" fill="#C96B6B" opacity="0.7"/>
      <circle cx="180" cy="160" r="18" fill="#D47B7B" opacity="0.75"/>
      <circle cx="240" cy="150" r="17" fill="#C96B6B" opacity="0.72"/>
      <line x1="100" y1="120" x2="100" y2="160" stroke="#A05050" stroke-width="1" opacity="0.4"/>
      <line x1="180" y1="125" x2="180" y2="165" stroke="#A05050" stroke-width="1" opacity="0.4"/>
      <text x="10" y="280" font-size="12" fill="#333">Acne & Scarring</text>
    </svg>`,
  ]

  const svgContent = conditions[Math.floor(Math.random() * conditions.length)]
  return "data:image/svg+xml;base64," + btoa(svgContent)
}

export const mockImages = ["psoriasis", "eczema", "dermatitis", "fungal", "melanoma", "acne"]

export function getRandomImage(): string {
  const type = mockImages[Math.floor(Math.random() * mockImages.length)]
  return generateMockSkinImage(type)
}

export function getRandomImages(count = 2): string[] {
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(getRandomImage())
  }
  return result
}
