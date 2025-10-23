import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

build();

function build() {
    fs.rmSync("build", { recursive: true, force: true });

    fs.cpSync("src/configs", "build/configs", { recursive: true });

    exec("tsc", (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        
        resolvePathAliases();
    });

}

function resolvePathAliases() {
    const tsConfigPath = "tsconfig.json";
    const tsConfigJson = JSON.parse(fs.readFileSync(tsConfigPath));
    const baseUrl = tsConfigJson.compilerOptions.baseUrl;
    const pathAliases = tsConfigJson.compilerOptions.paths;
    const buildFiles = getFilesRecursively("build");
    const jsFiles = buildFiles.filter(file => /\.js$/.test(file));

    for (const jsFile of jsFiles) {
        const dir = path.dirname(jsFile);
        let content = fs.readFileSync(jsFile, "utf8");

        content = content.replace(/require\(["'][^"']+['"]\)|(import|export).*?from.*?["'][^"']+['"]/g, match => {
            const originalPath = match
                .replace('require("', "")
                .replace(/"\)$/, "")
                .replace(/^(import|export).*?from.*?["']/, "")
                .replace(/['"]$/, "");
            let resolvedPath = originalPath;

            outer: for (const [patternStr, replacements] of Object.entries(pathAliases)) {
                const pattern = new RegExp(patternStr.replace("*", ".*"));
                const alias = patternStr.replace("*", "");

                if (pattern.test(originalPath)) {
                    for (const replacement of replacements) {
                        let resolved = path.resolve(baseUrl, originalPath + ".ts");
                        let temp = originalPath.replace(alias, replacement.replace("*", ""));

                        resolved = path.resolve(baseUrl, temp + ".ts");
                        if (fs.existsSync(resolved)) {
                            resolvedPath = resolved.replace(/\bsrc\b/, "build").replace(".ts", ".js");
                            break outer;
                        }

                        resolved = path.resolve(baseUrl, temp + "/index.ts");
                        if (fs.existsSync(resolved)) {
                            resolvedPath = resolved.replace(/\bsrc\b/, "build").replace(".ts", ".js");
                            break outer;
                        }

                        resolved = path.resolve(baseUrl, temp);
                        if (fs.existsSync(resolved)) {
                            resolvedPath = resolved.replace(/\bsrc\b/, "build");
                            break outer;
                        }
                    }
                } else {
                    let temp =  path.resolve(dir, originalPath + ".js");
                    if (fs.existsSync(temp)) {
                        resolvedPath = temp;
                        break outer;
                    }

                    temp =  path.resolve(dir, originalPath + "/index.js");
                    if (fs.existsSync(temp)) {
                        resolvedPath = temp;
                        break outer;
                    }

                    temp = path.resolve(dir, originalPath);
                    if (fs.existsSync(temp)) {
                        resolvedPath = temp;
                        break outer;
                    }
                }
            }

            if (resolvedPath !== originalPath) {
                const basePath = path.resolve(baseUrl, dir);
                resolvedPath = "./" + path.relative(basePath, resolvedPath);
            }

            if (resolvedPath.includes(".json") && /^(import|export)/.test(match)) {
                match += '  assert { type: "json" }';
            } 

            return match.replace(originalPath, resolvedPath);
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