. .\EnvironmentVariable.ps1
. .\BuildFunctions.ps1
 
Function InitNet {
    rd $build_dir -recurse -force  -ErrorAction Ignore
	md $build_dir > $null

	exec {
		& dotnet clean $source_api_dir/$projectName.sln -nologo -v $verbosity
		}
	exec {
		& dotnet restore $source_api_dir/$projectName.sln -nologo --interactive -v $verbosity  
		}
    

    Write-Host $projectConfig
    Write-Host $version
}


Function CompileNet{
	exec {
		& dotnet build $source_api_dir/$projectName.sln -nologo --no-restore -v $verbosity -maxcpucount --configuration $projectConfig --no-incremental /p:Version=$version /p:Authors="Andre" /p:Product="Architecture"
	}
}

Function UnitTestsNet{
	Push-Location -Path $unitTestProjectPath

	Write-Host $unitTestProjectPath

	try {
		exec {
			& dotnet test -nologo -v $verbosity --logger:trx --results-directory $test_dir --no-build --no-restore --configuration $projectConfig /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=$test_dir/coverage/
		}
	}
	finally {
		Pop-Location
	}
}

Function IntegrationTestNet{
	Push-Location -Path $integrationTestProjectPath

	try {
		exec {
			& dotnet test -nologo -v $verbosity --logger:trx --results-directory $test_dir --no-build --no-restore --configuration $projectConfig /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura /p:CoverletOutput=$test_dir/Coverage/
		}
	}
	finally {
		Pop-Location
	}
}

Function PublishNet{
	$csProjWebApi = "$apiDir/src/$projectName"".Api""/$projectName"".Api"".csproj"
	# Publish Net Core Api
	exec {
		& dotnet publish "./$csProjWebApi" -c $projectConfig --no-restore --no-build -o "./$apiDir/src/$projectName"".Api""/publish/" -f netcoreapp3.1
	}
}

Function CIBuildNetApi{
	InitNet
	CompileNet
	UnitTestsNet
	IntegrationTestNet
	PublishNet
}