// outer.js
export async function load() {
    const inner = await import('./inner.js');
    return inner.value;
}
