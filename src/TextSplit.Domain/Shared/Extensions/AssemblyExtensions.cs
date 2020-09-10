using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace TextSplit.Domain.Shared.Extensions
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<Type> GetAllClassesFromType<T>(this AppDomain appDomain)
            => appDomain.GetAssemblies()
                .ExcludeProblematicNamespaces()
                .SelectMany(s => s.GetLoadableTypes())
                .Where(p => typeof(T).IsAssignableFrom(p) && !p.IsInterface && p.IsClass && !p.IsAbstract);

        public static IEnumerable<Assembly> ExcludeProblematicNamespaces(this Assembly[] assemblies)
            => assemblies.Where(assembly => !assembly.FullName.StartsWith("Microsoft.VisualStudio.TraceDataCollector"));

        // https://stackoverflow.com/questions/7889228/how-to-prevent-reflectiontypeloadexception-when-calling-assembly-gettypes
        // This method greatly reduces the likelyhood of ReflectionTypeLoad Exceptions while running test
        public static IEnumerable<Type> GetLoadableTypes(this Assembly assembly)
        {
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException e)
            {
                return e.Types.Where(t => t != null);
            }
        }
    }
}
