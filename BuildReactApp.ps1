. .\EnvironmentVariable.ps1
. .\BuildFunctions.ps1

Function CIBuildReact{

	exec{
		& cd $source_web_app_dir
		& npm install 
	}
	CreateFileEnvIfNotExitsForReact
	exec{
		& npm run build
		& cd $base_dir
	}
}

Function CreateFileEnvIfNotExitsForReact{
	if (-Not(Test-Path ".env")) {
		Write-Host "Create .env file"
		Write-Host "REACT_APP_API_GRAPH_COUNTRIES=$urlApiGraphCountries`nREACT_APP_API_CUSTOM_COUNTRIES=$urlApiCustomCountries`nREACT_APP_AUTH_ENCODE=$apiKeyAuthEncode"
		exec{
			Set-Content -Path .env -Value "REACT_APP_API_GRAPH_COUNTRIES=$urlApiGraphCountries`nREACT_APP_API_CUSTOM_COUNTRIES=$urlApiCustomCountries`nREACT_APP_AUTH_ENCODE=$apiKeyAuthEncode"
		}
	}
	else {
		Write-Host "File .env exists"
	}
}