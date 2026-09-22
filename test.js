// t.js - combined module loader test suite
import * as r from './render.js';

console.log("--- local relative import ---");
console.log(typeof r);

async function run(label, fn) {
    try {
        await fn();
    } catch (e) {
        print(label + " FAILED: " + e);
    }
}

run("nested path resolution", async () => {
    const m = await import('https://raw.githubusercontent.com/atamariya/jsmod/main/main.js');
    print("nested: ok");
});

run("circular import (functions)", async () => {
    const a = await import('https://raw.githubusercontent.com/atamariya/jsmod/main/a.js');
    print("circular fa:", typeof a.fa);
});

run("import.meta.url", async () => {
    const m = await import('https://raw.githubusercontent.com/atamariya/jsmod/main/metamain.js');
    print("meta:", m.url ? m.url : "check metamain.js re-exports url");
});

run("syntax error handling", async () => {
    try {
        await import('https://raw.githubusercontent.com/atamariya/jsmod/main/broken.js');
        print("syntax error test FAILED: no error thrown");
    } catch (e) {
        print("syntax error correctly caught:", e.message || e);
    }
});

run("nested dynamic import", async () => {
    const m = await import('https://raw.githubusercontent.com/atamariya/jsmod/main/outer.js');
    print("nested dynamic import ->", await m.load());
});
