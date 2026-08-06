#requires -version 5.1
<#
  Generates the PWA / apple-touch icon set with System.Drawing.

  Black and silver only. A machined bar-and-rule mark: a brushed
  metal slug over a hard horizontal rule. No colour, no glow, no
  rounded corners - iOS applies its own mask, so a full-bleed
  square is the correct source.

  Usage:  powershell -ExecutionPolicy Bypass -File tools\make-icons.ps1
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$out = Join-Path (Split-Path -Parent $PSScriptRoot) 'icons'
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out -Force | Out-Null }

function New-CaveIcon {
    param(
        [int]$Size,
        [string]$Path,
        # Maskable icons must survive a circular crop, so the mark shrinks.
        [switch]$Maskable
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # --- flat black plate, full bleed ------------------------------------
    $g.Clear([System.Drawing.Color]::FromArgb(255, 0, 0, 0))

    $silverHi = [System.Drawing.Color]::FromArgb(255, 242, 244, 247)
    $steel    = [System.Drawing.Color]::FromArgb(255, 139, 144, 153)
    $rule     = [System.Drawing.Color]::FromArgb(255, 62, 64, 70)

    $scale = if ($Maskable) { 0.62 } else { 1.0 }
    $cx = $Size / 2.0
    $cy = $Size / 2.0

    # --- the horizontal rule the mark sits on ----------------------------
    $ruleW = $Size * 0.52 * $scale
    $rulePen = New-Object System.Drawing.Pen($rule, [Math]::Max(1.0, $Size * 0.012 * $scale))
    $g.DrawLine($rulePen, [single]($cx - $ruleW / 2), [single]$cy, [single]($cx + $ruleW / 2), [single]$cy)
    $rulePen.Dispose()

    # --- brushed metal slug, sitting on the rule -------------------------
    $slabW = $Size * 0.30 * $scale
    $slabH = $Size * 0.30 * $scale
    $slab = New-Object System.Drawing.RectangleF(
        [single]($cx - $slabW / 2), [single]($cy - $slabH / 2), [single]$slabW, [single]$slabH)

    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF([single]$slab.Left, [single]$slab.Top)),
        (New-Object System.Drawing.PointF([single]$slab.Right, [single]$slab.Bottom)),
        $silverHi, $steel)
    $g.FillRectangle($brush, $slab)
    $brush.Dispose()

    # --- two short index marks, left and right of the slug ---------------
    $tickPen = New-Object System.Drawing.Pen($silverHi, [Math]::Max(1.5, $Size * 0.026 * $scale))
    $t0 = $Size * 0.215 * $scale
    $t1 = $Size * 0.305 * $scale
    $g.DrawLine($tickPen, [single]($cx - $t0), [single]$cy, [single]($cx - $t1), [single]$cy)
    $g.DrawLine($tickPen, [single]($cx + $t0), [single]$cy, [single]($cx + $t1), [single]$cy)
    $tickPen.Dispose()

    # --- hairline frame ---------------------------------------------------
    if (-not $Maskable) {
        $edge = New-Object System.Drawing.Pen($rule, [Math]::Max(1.0, $Size * 0.008))
        $inset = [Math]::Max(1.0, $Size * 0.055)
        $g.DrawRectangle($edge, [single]$inset, [single]$inset,
            [single]($Size - $inset * 2), [single]($Size - $inset * 2))
        $edge.Dispose()
    }

    $g.Dispose()
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host ("  wrote {0}" -f (Split-Path -Leaf $Path))
}

Write-Host "Generating icons -> $out"
New-CaveIcon -Size 32   -Path (Join-Path $out 'icon-32.png')
New-CaveIcon -Size 180  -Path (Join-Path $out 'apple-touch-icon.png')
New-CaveIcon -Size 192  -Path (Join-Path $out 'icon-192.png')
New-CaveIcon -Size 512  -Path (Join-Path $out 'icon-512.png')
New-CaveIcon -Size 512  -Path (Join-Path $out 'icon-maskable-512.png') -Maskable
Write-Host "Done."
