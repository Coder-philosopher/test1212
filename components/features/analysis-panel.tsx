"use client"

export default function AnalysisPanel() {
  return (
    <div className="space-y-6">
      {/* Severity Assessment Card */}
      <div className="bg-card border border-border p-6 shadow-sm">
        <h3 className="font-bold text-lg text-foreground mb-4">Severity Assessment</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium">Current Severity Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted h-3">
                <div className="bg-destructive h-3" style={{ width: "65%" }}></div>
              </div>
              <span className="text-lg font-bold text-foreground min-w-fit">6.5/10</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium">Body Surface Area Affected</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted h-3">
                <div className="bg-primary h-3" style={{ width: "42%" }}></div>
              </div>
              <span className="text-lg font-bold text-foreground min-w-fit">42% BSA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Features Card */}
      <div className="bg-card border border-border p-6 shadow-sm">
        <h3 className="font-bold text-lg text-foreground mb-4">Detected Clinical Features</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">✓</span>
            </div>
            <span className="text-sm text-foreground">Erythema present</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">✓</span>
            </div>
            <span className="text-sm text-foreground">Scaling observed</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">✓</span>
            </div>
            <span className="text-sm text-foreground">Well-defined borders</span>
          </div>
          <div className="flex items-center gap-3 py-2 opacity-60">
            <div className="w-5 h-5 bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">-</span>
            </div>
            <span className="text-sm text-foreground">No bleeding lesions</span>
          </div>
        </div>
      </div>

      {/* Clinical Recommendations Card */}
      <div className="bg-accent/10 border border-accent p-6">
        <h3 className="font-bold text-lg text-foreground mb-3">Clinical Recommendations</h3>
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Monitor for progression through regular photographic documentation. Current treatment response appears
            adequate. Consider escalation if severity increases beyond 7/10 score.
          </p>
          <div className="bg-muted p-3 mt-4">
            <p className="text-xs font-bold text-foreground mb-1">Follow-up Schedule:</p>
            <p className="text-xs text-muted-foreground">Recommend reassessment in 2-4 weeks</p>
          </div>
        </div>
      </div>

      {/* Confidence & Disclaimer Card */}
      <div className="bg-card border border-border p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2 font-medium">Analysis Confidence Level</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted h-2">
                <div className="bg-accent h-2" style={{ width: "87%" }}></div>
              </div>
              <span className="font-bold text-foreground text-base">87%</span>
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-medium text-destructive mb-2">Clinical Notice</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Artificial analysis is for reference only. All findings require clinical verification by qualified
              dermatologist. This tool does not replace professional medical judgment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
