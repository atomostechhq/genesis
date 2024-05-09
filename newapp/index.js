const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentsDir = path.join(__dirname, '../app/components/');
const tableSubDir = path.join(componentsDir, '/tables/');

function extractClassNames(str) {
    const classPattern = /[a-zA-Z0-9:\-/]+(?=["'`\s])/g;
    let classNames = str.match(classPattern);
    return classNames || [];
}

function extractDynamicClasses(content) {
    const dynamicPatterns = [
        /className={`[^`]*`}/g,
        /className={"[^"]*"}/g,
        /className={'[^']*'}/g 
    ];
    let classNames = [];
    dynamicPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
            matches.forEach(match => {
                classNames = classNames.concat(extractClassNames(match));
            });
        }
    });
    return classNames;
}

function findDynamicTailwindClasses(directory) {
    const files = glob.sync(directory + '**/*.{js,jsx,ts,tsx}', { absolute: true });
    let dynamicClassNames = [];

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        console.log(file)
        dynamicClassNames = dynamicClassNames.concat(extractDynamicClasses(content));
    });

    return dynamicClassNames;
}

const componentClasses = findDynamicTailwindClasses(componentsDir);
const tableClasses = findDynamicTailwindClasses(tableSubDir);

const allDynamicClasses = Array.from(new Set([...componentClasses, ...tableClasses]));

console.log(allDynamicClasses);


// Filter out any unwanted characters or invalid class names (e.g., single colon)
const validClassNames = allDynamicClasses.filter(name => /^[a-zA-Z0-9\-:\/]+$/g.test(name) && name !== ':');

// Generate CSS
const cssContent = validClassNames.map(className => `.${className} {}`).join('\n');

// Output or save to file
console.log(cssContent);

fs.writeFileSync('../app/tailwind-helper.css', cssContent);
