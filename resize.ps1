Add-Type -AssemblyName System.Drawing
$imgPath = "c:\Users\ikenna.okonkwo\OneDrive - Interswitch Limited\Desktop\JAMLOCK\Quantun product\images\bracelet.png"
$img = [System.Drawing.Image]::FromFile($imgPath)

$targetWidth = 800
if ($img.Width -gt $targetWidth) {
    $ratio = $targetWidth / $img.Width
    $newHeight = [int]($img.Height * $ratio)
} else {
    $targetWidth = $img.Width
    $newHeight = $img.Height
}

$bmp = New-Object System.Drawing.Bitmap $targetWidth, $newHeight
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, $targetWidth, $newHeight)
$bmp.Save("c:\Users\ikenna.okonkwo\OneDrive - Interswitch Limited\Desktop\JAMLOCK\Quantun product\images\bracelet.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()
