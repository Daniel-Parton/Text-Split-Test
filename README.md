# Text-Split-Test

## Deployed Site
https://text-split.azurewebsites.net/


Simple .Net Core backend, React Typescript frontend which shows the intercection of a string and substring.

Deployed to azure using github actions

On pull request will run github action for build and tests

## .Net Core Backend

```
./TextSplit.Api
```

### App Settings
The way app settings is bootstrapped into the .Net Core Pipeline is a bit different than normal. the typed Application Settings is here:

```
  ./TextSplit.Domain/ApplicationSettings.cs
```

the class has a static method to build default settings based on the environment passed in.


#### Bootstrapping App Settings

In Program.cs it calls the extension method ResolveSettings:

```
.ConfigureAppConfiguration((context, config) =>
{
    config.ResolveSettings(context.HostingEnvironment.EnvironmentName);
})
```

This extension method will set default values for application settings using the typed model described above.
```
public static IConfigurationBuilder ResolveSettings(this IConfigurationBuilder config,
    string environment,
    Action<ApplicationSettings> settingsAction = null)
{
    var settings = ApplicationSettings.New(environment, settingsAction);
    return config
        .AddDefaultSettings(settings);
}

private static IConfigurationBuilder AddDefaultSettings(this IConfigurationBuilder config, ApplicationSettings settings)
{
    var json = JsonConvert.SerializeObject(settings, new JsonSerializerSettings
    {
        ContractResolver = new PrivateReadResolver(),
        Converters = new List<JsonConverter> { new StringEnumConverter() },
    });

    config.Sources.Insert(0, new JsonStreamConfigurationSource { Stream = new MemoryStream(Encoding.ASCII.GetBytes(json)) });

    return config;
}
```

The code will insert the default app settings as the first config source.  This way you could add more settings on top and any value in appsettings.json will override the default.

### Hosted SPA
the client for this app is a React SPA application:
```
./TextSplit.Api/ClientApp/
```

Startup.cs is configured to serve this application

### Testing
I have included some unit tests for the main functionality of the matching code as well as itegration tests for the API.   
```
./TextSplit.Test/
```

### CI/CD
Github actions has been set up on Pull Requests to Test code and any push to master will deploy to azure.