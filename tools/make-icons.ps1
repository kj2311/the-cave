#requires -version 5.1
<#
  Generates the PWA / apple-touch icon set with System.Drawing.
  The mark is a gapped reticle ring with a glowing core - a "watching lens".

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
        # Maskable icons must survive a circular crop, so the mark shrinks
        # and the background bleeds to the full square.
        [switch]$Maskable
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $amber = [System.Drawing.Color]::FromArgb(255, 245, 166, 35)
    $amberDim = [System.Drawing.Color]::FromArgb(120, 245, 166, 35)

    # --- background plate -------------------------------------------------
    $radius = if ($Maskable) { 0 } else { [int]($Size * 0.225) }
    $rect = New-Object System.Drawing.RectangleF(0, 0, $Size, $Size)
    $bgPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    if ($radius -gt 0) {
        $d = $radius * 2
        $bgPath.AddArc(0, 0, $d, $d, 180, 90)
        $bgPath.AddArc($Size - $d, 0, $d, $d, 270, 90)
        $bgPath.AddArc($Size - $d, $Size - $d, $d, $d, 0, 90)
        $bgPath.AddArc(0, $Size - $d, $d, $d, 90, 90)
        $bgPath.CloseFigure()
    } else {
        $bgPath.AddRectangle($rect)
    }

    $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF(0, 0)),
        (New-Object System.Drawing.PointF($Size, $Size)),
        [System.Drawing.Color]::FromArgb(255, 17, 24, 32),
        [System.Drawing.Color]::FromArgb(255, 5, 7, 10))
    $g.FillPath($grad, $bgPath)
    $grad.Dispose()

    # Clip everything else to the plate so glow never leaks past the corners.
    $g.SetClip($bgPath)

    $cx = $Size / 2.0
    $cy = $Size / 2.0
    $scale = if ($Maskable) { 0.62 } else { 1.0 }

    # --- ambient bloom behind the mark -----------------------------------
    $bloomR = $Size * 0.42 * $scale
    $bloomRect = New-Object System.Drawing.RectangleF(($cx - $bloomR), ($cy - $bloomR), ($bloomR * 2), ($bloomR * 2))
    $bloomPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bloomPath.AddEllipse($bloomRect)
    $bloom = New-Object System.Drawing.Drawing2D.PathGradientBrush($bloomPath)
    $bloom.CenterColor = [System.Drawing.Color]::FromArgb(70, 245, 166, 35)
    $bloom.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 245, 166, 35))
    $g.FillPath($bloom, $bloomPath)
    $bloom.Dispose()
    $bloomPath.Dispose()

    # --- outer reticle: four arcs with gaps on the diagonals --------------
    $ringR = $Size * 0.315 * $scale
    $ringRect = New-Object System.Drawing.RectangleF(($cx - $ringR), ($cy - $ringR), ($ringR * 2), ($ringR * 2))
    $penW = [Math]::Max(2.0, $Size * 0.052 * $scale)
    $pen = New-Object System.Drawing.Pen($amber, $penW)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    foreach ($start in 28, 118, 208, 298) {
        $g.DrawArc($pen, $ringRect, $start, 34)
    }
    $pen.Dispose()

    # --- inner ring -------------------------------------------------------
    $innerR = $Size * 0.185 * $scale
    $innerRect = New-Object System.Drawing.RectangleF(($cx - $innerR), ($cy - $innerR), ($innerR * 2), ($innerR * 2))
    $penIn = New-Object System.Drawing.Pen($amberDim, [Math]::Max(1.0, $Size * 0.022 * $scale))
    $g.DrawEllipse($penIn, $innerRect)
    $penIn.Dispose()

    # --- core -------------------------------------------------------------
    $coreR = $Size * 0.072 * $scale
    $coreRect = New-Object System.Drawing.RectangleF(($cx - $coreR), ($cy - $coreR), ($coreR * 2), ($coreR * 2))
    $core = New-Object System.Drawing.SolidBrush($amber)
    $g.FillEllipse($core, $coreRect)
    $core.Dispose()

    # --- crosshair ticks --------------------------------------------------
    $tick = New-Object System.Drawing.Pen($amber, [Math]::Max(1.5, $Size * 0.030 * $scale))
    $tick.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $tick.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $t0 = $Size * 0.375 * $scale
    $t1 = $Size * 0.445 * $scale
    $g.DrawLine($tick, [single]$cx, [single]($cy - $t0), [single]$cx, [single]($cy - $t1))
    $g.DrawLine($tick, [single]$cx, [single]($cy + $t0), [single]$cx, [single]($cy + $t1))
    $g.DrawLine($tick, [single]($cx - $t0), [single]$cy, [single]($cx - $t1), [single]$cy)
    $g.DrawLine($tick, [single]($cx + $t0), [single]$cy, [single]($cx + $t1), [single]$cy)
    $tick.Dispose()

    $g.ResetClip()

    # --- hairline edge ----------------------------------------------------
    if (-not $Maskable) {
        $edge = New-Object System.Drawing.Pen(([System.Drawing.Color]::FromArgb(90, 120, 145, 170)), [Math]::Max(1.0, $Size * 0.008))
        $g.DrawPath($edge, $bgPath)
        $edge.Dispose()
    }

    $bgPath.Dispose()
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
