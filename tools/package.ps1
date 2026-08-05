#requires -version 5.1
<#
  Builds the deployable zip.

  Compress-Archive on Windows PowerShell writes entry names with backslashes,
  which violates the ZIP spec — some hosts then extract the whole tree as flat
  files named "css\app.css". This writes forward slashes explicitly.

  Usage:  powershell -ExecutionPolicy Bypass -File tools\package.ps1
#>
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = (Resolve-Path (Split-Path -Parent $PSScriptRoot)).Path
$zipPath = Join-Path $root 'the-cave-site.zip'

# Only what the site actually needs to serve.
$include = @(
    'index.html',
    'manifest.webmanifest',
    'sw.js',
    'css',
    'js',
    'icons'
)

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$files = @()
foreach ($item in $include) {
    $p = Join-Path $root $item
    if (-not (Test-Path $p)) { continue }
    if ((Get-Item $p).PSIsContainer) {
        $files += Get-ChildItem $p -Recurse -File
    } else {
        $files += Get-Item $p
    }
}

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($f in $files) {
        $rel = $f.FullName.Substring($root.Length).TrimStart('\', '/').Replace('\', '/')
        $entry = $zip.CreateEntry($rel, [System.IO.Compression.CompressionLevel]::Optimal)
        $out = $entry.Open()
        try {
            $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
            $out.Write($bytes, 0, $bytes.Length)
        } finally {
            $out.Dispose()
        }
        Write-Host ("  + {0}" -f $rel)
    }
} finally {
    $zip.Dispose()
}

Write-Host ""
Write-Host ("Wrote {0} ({1:N0} KB, {2} files)" -f $zipPath, ((Get-Item $zipPath).Length / 1KB), $files.Count)
