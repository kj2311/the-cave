#requires -version 5.1
<#
  Minimal static file server for local development.
  No Node/Python on this machine, so we use HttpListener.

  Usage:  powershell -ExecutionPolicy Bypass -File tools\serve.ps1 -Port 8787
#>
param(
    [int]$Port = 8787,
    [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.js'   = 'text/javascript; charset=utf-8'
    '.mjs'  = 'text/javascript; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.webmanifest' = 'application/manifest+json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.svg'  = 'image/svg+xml; charset=utf-8'
    '.ico'  = 'image/x-icon'
    '.woff2' = 'font/woff2'
    '.txt'  = 'text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
try {
    $listener.Start()
} catch {
    Write-Host "Could not bind port $Port. $($_.Exception.Message)"
    exit 1
}

Write-Host "THE CAVE :: static server"
Write-Host "  root  $Root"
Write-Host "  url   http://localhost:$Port/"
Write-Host "  (ctrl-c to stop)"

while ($listener.IsListening) {
    try {
        $ctx = $listener.GetContext()
    } catch {
        break
    }
    $req = $ctx.Request
    $res = $ctx.Response

    try {
        $rel = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
        if ($rel -eq '') { $rel = 'index.html' }
        $path = Join-Path $Root ($rel -replace '/', '\')

        # Keep requests inside the web root.
        $full = [System.IO.Path]::GetFullPath($path)
        if (-not $full.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
            $res.StatusCode = 403
            $res.Close()
            continue
        }

        if ((Test-Path $full) -and -not (Get-Item $full).PSIsContainer) {
            $ext = [System.IO.Path]::GetExtension($full).ToLower()
            $type = $mime[$ext]
            if (-not $type) { $type = 'application/octet-stream' }
            $bytes = [System.IO.File]::ReadAllBytes($full)
            $res.ContentType = $type
            # No caching in dev, otherwise the service worker masks edits.
            $res.Headers.Add('Cache-Control', 'no-store, no-cache, must-revalidate')
            $res.StatusCode = 200
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host ("  200  /{0}" -f $rel)
        } else {
            $body = [System.Text.Encoding]::UTF8.GetBytes("404 - $rel")
            $res.StatusCode = 404
            $res.ContentType = 'text/plain; charset=utf-8'
            $res.ContentLength64 = $body.Length
            $res.OutputStream.Write($body, 0, $body.Length)
            Write-Host ("  404  /{0}" -f $rel)
        }
    } catch {
        Write-Host ("  ERR  {0}" -f $_.Exception.Message)
        try { $res.StatusCode = 500 } catch {}
    } finally {
        try { $res.Close() } catch {}
    }
}

$listener.Stop()
