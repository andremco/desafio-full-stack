$projectName = $env:PROJECTNAME
if ([string]::IsNullOrEmpty($projectName)) { throw("Empty var projectName!") }

$apiDir = $env:APIDIR
if ([string]::IsNullOrEmpty($apiDir)) { throw("Empty var apiDir!") }

$webAppDir = $env:WEBAPPDIR
if ([string]::IsNullOrEmpty($webAppDir)) { throw("Empty var webAppDir!") }

$base_dir = resolve-path ./
$source_api_dir = "$base_dir" + $apiDir
$source_web_app_dir = "$base_dir" + $webAppDir

$unitTestProjectPath = -join($source_api_dir, "/test/", $projectName, ".Unit.Tests")
$integrationTestProjectPath = -join($source_api_dir, "/test/", $projectName, ".Integration.Tests")
$projectConfig = $env:BUILDCONFIGURATION
$version = $env:VERSION
$verbosity = "m"

$build_dir = "$base_dir/build"
$test_dir = "$build_dir/test"

if ([string]::IsNullOrEmpty($version)) { $version = "9.9.9"}
if ([string]::IsNullOrEmpty($projectConfig)) {$projectConfig = "Release"}

## .env for react!

$urlApiGraphCountries = $env:URLAPIGRAPHCOUNTRIES
if ([string]::IsNullOrEmpty($urlApiGraphCountries)) { 
    $urlApiGraphCountries = "https://countries-274616.ew.r.appspot.com" 
}

$urlApiCustomCountries = $env:URLAPICUSTOMCOUNTRIES
if ([string]::IsNullOrEmpty($urlApiCustomCountries)) { 
    $urlApiCustomCountries = "http://localhost:5000/api/v1/" 
}

$apiKeyAuthEncode = $env:APIKEYAUTHENCODE
if ([string]::IsNullOrEmpty($apiKeyAuthEncode)) { 
    $apiKeyAuthEncode = "YWRtaW46MTIzNDU2" 
}