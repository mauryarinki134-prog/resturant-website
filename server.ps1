$port = 8000
$path = "c:\Users\welcome\3d website"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server running at http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = [System.IO.Path]::Combine($path, $request.Url.LocalPath.TrimStart('/'))
        if (Test-Path -PathType Container $localPath) {
            $localPath = [System.IO.Path]::Combine($localPath, 'index.html')
        }

        if (Test-Path $localPath) {
            $buffer = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentLength64 = $buffer.Length
            
            # Set content types
            if ($localPath -match "\.html$") { $response.ContentType = "text/html" }
            elseif ($localPath -match "\.css$") { $response.ContentType = "text/css" }
            elseif ($localPath -match "\.js$") { $response.ContentType = "application/javascript" }
            elseif ($localPath -match "\.jpg$") { $response.ContentType = "image/jpeg" }
            elseif ($localPath -match "\.svg$") { $response.ContentType = "image/svg+xml" }
            elseif ($localPath -match "\.png$") { $response.ContentType = "image/png" }
            elseif ($localPath -match "\.json$") { $response.ContentType = "application/json" }
            
            $output = $response.OutputStream
            $output.Write($buffer, 0, $buffer.Length)
            $output.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
}
