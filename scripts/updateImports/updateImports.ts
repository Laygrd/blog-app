import { Project } from "ts-morph";

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const sourceFiles = project.getSourceFiles();

const layers = ['app', 'pages', 'features', 'widgets', 'entities', 'shared'];

const isAbsolutePath = (p: string) => {
    return layers.some((layer) => p.startsWith(layer));
}

sourceFiles.forEach(sourceFile => {
    const importDeclarations = sourceFile.getImportDeclarations();

    console.log(`\n${sourceFile.getBaseName()}:`)

    importDeclarations.forEach(importDeclaration => {
        const value = importDeclaration.getModuleSpecifierValue();
        if (isAbsolutePath(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`)
            console.log('\x1b[31m%s\x1b[0m', ` - ${value} : will be updated.`);
        } else {
            console.log('\x1b[32m%s\x1b[0m', ` - ${value}`);
        }
    });
})

project.save();