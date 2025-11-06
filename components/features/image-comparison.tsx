"use client"

import { useState } from "react"
import { getRandomImages } from "@/lib/mock-images"

interface ImageComparisonProps {
  images: string[]
}

export default function ImageComparison({ images }: ImageComparisonProps) {
  const [displayImages, setDisplayImages] = useState<string[]>(
    images && images.length > 0 ? images : getRandomImages(2),
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [comparisonMode, setComparisonMode] = useState<"single" | "side-by-side">("single")

  const handleRefreshImages = () => {
    setDisplayImages(getRandomImages(2))
  }

  if (comparisonMode === "side-by-side" && displayImages.length > 1) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setComparisonMode("single")} className="btn-outline text-sm">
            Single View
          </button>
          <button onClick={() => setComparisonMode("side-by-side")} className="btn-primary text-sm">
            Side-by-Side Comparison
          </button>
          <button onClick={handleRefreshImages} className="btn-secondary text-sm">
            Load New Images
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayImages.slice(0, 2).map((img, idx) => (
            <div key={idx} className="bg-card border border-border overflow-hidden shadow-md">
              <img
                src={img || "/placeholder.svg"}
                alt={`View ${idx + 1}`}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-4 bg-muted border-t border-border">
                <p className="font-medium text-foreground">{idx === 0 ? "Previous Visit" : "Current Visit"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {idx === 0 ? "Baseline for comparison" : "Latest assessment"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-4">
          <p className="font-medium text-foreground mb-3">Clinical Comparison Notes</p>
          <p className="text-sm text-muted-foreground">
            Changes observed: {Math.floor(Math.random() * 30) + 10}% progression. Area affected appears{" "}
            {Math.random() > 0.5 ? "improved" : "worsened"}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4 flex-wrap">
        <button onClick={() => setComparisonMode("single")} className="btn-primary text-sm">
          Single View
        </button>
        {displayImages.length > 1 && (
          <button onClick={() => setComparisonMode("side-by-side")} className="btn-outline text-sm">
            Side-by-Side Comparison
          </button>
        )}
        <button onClick={handleRefreshImages} className="btn-secondary text-sm">
          Load New Images
        </button>
      </div>

      <div className="bg-muted border border-border overflow-hidden shadow-md">
        <img
          src={displayImages[selectedIndex] || "/placeholder.svg"}
          alt="Selected"
          className="w-full max-h-96 object-cover"
        />
        <div className="p-4 bg-card border-t border-border">
          <p className="text-sm font-medium text-foreground">Image Analysis</p>
          <p className="text-xs text-muted-foreground mt-1">
            Assessment: Region shows {Math.random() > 0.5 ? "improvement" : "progression"} with{" "}
            {Math.floor(Math.random() * 50) + 20}% clinical change
          </p>
        </div>
      </div>

      {displayImages.length > 1 && (
        <div className="bg-card border border-border p-4">
          <p className="text-sm font-medium text-foreground mb-3">Image History</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                /* Removed rounded-md */
                className={`flex-shrink-0 w-20 h-20 border-2 overflow-hidden transition-all ${
                  selectedIndex === idx ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                }`}
              >
                <img src={img || "/placeholder.svg"} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
