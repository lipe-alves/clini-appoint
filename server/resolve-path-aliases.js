const fs = require("fs");
const path = require("path");

main();

function main() {
    const tsConfigPath = "tsconfig.json";
    const tsConfigJson = JSON.parse(fs.readFileSync(tsConfigPath));
    const baseUrl = tsConfigJson.compilerOptions.baseUrl;
    const pathAliases = tsConfigJson.compilerOptions.paths;
    const buildFiles = getFilesRecursively("build");
    const jsFiles = buildFiles.filter(file => /\.js$/.test(file));

    for (const jsFile of jsFiles) {
        const dir = path.dirname(jsFile);
        let content = fs.readFileSync(jsFile, "utf8");

        content = content.replace(/require\("[^"]+"\)/g, match => {
            const originalPath = match.replace('require("', "").replace(/"\)$/, "");
            let resolvedPath = originalPath;

            for (const [patternStr, replacements] of Object.entries(pathAliases)) {
                const pattern = new RegExp(patternStr.replace("*", ".*"));
                const alias = patternStr.replace("*", "");

                if (pattern.test(originalPath)) {
                    let resolved = path.resolve(baseUrl, originalPath + ".ts");

                    for (const replacement of replacements) {
                        const temp = originalPath.replace(alias, replacement.replace("*", ""));
                        resolved = path.resolve(baseUrl, temp + ".ts");
                    }

                    if (fs.existsSync(resolved)) {
                        resolvedPath = resolved.replace(/\bsrc\b/, "build").replace(".ts", ".js");
                        break;
                    }

                    if (resolvedPath !== originalPath) {
                        break;
                    }
                } else {
                    const temp =  path.resolve(dir, originalPath + ".js");
                    if (fs.existsSync(temp)) {
                        resolvedPath = temp;
                        break;
                    }
                }
            }

            return `require("${resolvedPath}")`;
        });

        fs.writeFileSync(jsFile, content);
    }
}

function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory);

    items.forEach(item => {
        const fullPath = path.join(directory, item);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(getFilesRecursively(fullPath));
        } else {
            files.push(fullPath);
        }
    });

    return files;
}