# normalize-nombres.ps1
# Script de migracion: Normaliza el campo "nombre" de todos los productos al formato Sentence Case
# Uso: .\scripts\normalize-nombres.ps1

$supabaseUrl = "https://dhhmafjtytaethuypdze.supabase.co"
$supabaseKey = "sb_publishable_1wSVOeJaP3cW0dz9oJBveQ_qOjFWp88"

$headers = @{
    "apikey"        = $supabaseKey
    "Authorization" = "Bearer $supabaseKey"
    "Content-Type"  = "application/json"
    "Prefer"        = "return=minimal"
}

function Convert-ToSentenceCase([string]$text) {
    if ([string]::IsNullOrWhiteSpace($text)) { return $text }
    $trimmed = $text.Trim()
    $words = $trimmed -split '\s+'
    $result = @()
    for ($i = 0; $i -lt $words.Count; $i++) {
        $word = $words[$i]
        # Preservar siglas: 2-4 caracteres todos mayusculas/numeros
        if ($word -cmatch '^[A-Z0-9]{2,4}$') {
            $result += $word
        } elseif ($i -eq 0) {
            # Primera palabra: primera letra mayuscula, resto minusculas
            $result += $word.Substring(0,1).ToUpper() + $word.Substring(1).ToLower()
        } else {
            # Resto: minusculas
            $result += $word.ToLower()
        }
    }
    return ($result -join ' ')
}

Write-Host "Leyendo productos desde Supabase..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/productos?select=id,nombre&order=created_at.desc" `
        -Method GET -Headers $headers
} catch {
    Write-Host "Error al leer productos: $_" -ForegroundColor Red
    exit 1
}

$productos = $response
Write-Host "$($productos.Count) productos encontrados." -ForegroundColor Green
Write-Host ""

$actualizados = 0
$sinCambios   = 0
$errores      = @()

foreach ($producto in $productos) {
    $nombreNormalizado = Convert-ToSentenceCase $producto.nombre

    if ($nombreNormalizado -ceq $producto.nombre) {
        $sinCambios++
        continue
    }

    Write-Host "  [$($producto.id.Substring(0,8))] `"$($producto.nombre)`" -> `"$nombreNormalizado`"" -ForegroundColor Yellow

    $body = @{ nombre = $nombreNormalizado } | ConvertTo-Json -Compress

    try {
        Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/productos?id=eq.$($producto.id)" `
            -Method PATCH -Headers $headers -Body $body | Out-Null
        $actualizados++
    } catch {
        Write-Host "  ERROR actualizando '$($producto.nombre)': $_" -ForegroundColor Red
        $errores += $producto.nombre
    }
}

Write-Host ""
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Actualizados:  $actualizados" -ForegroundColor Green
Write-Host "Sin cambios:   $sinCambios"   -ForegroundColor Gray
if ($errores.Count -gt 0) {
    Write-Host "Con errores:   $($errores.Count)" -ForegroundColor Red
}
Write-Host "=============================" -ForegroundColor Cyan
