const test = require('node:test');
const assert = require('node:assert/strict');
const { readdirSync, readFileSync } = require('node:fs');
const { join, relative, resolve } = require('node:path');

const root = resolve(__dirname, '..');
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

test('standardized charts load their committed JSON inside the project URL', () => {
  let requests = 0;
  for (const file of htmlFiles(join(root, 'visuals', 'standardized'))) {
    const html = readFileSync(file, 'utf8');
    const page = new URL(relative(root, file), 'https://example.com/Tennis-Viz/');
    for (const [, path] of html.matchAll(/d3\.json\("([^"]+)"\)/g)) {
      const url = new URL(path, page);
      assert.ok(url.pathname.startsWith('/Tennis-Viz/data/json/'), `${relative(root, file)} escapes the project: ${path}`);
      const data = JSON.parse(readFileSync(resolve(file, '..', path), 'utf8'));
      assert.ok(data !== null, `${path} must contain JSON data`);
      requests++;
    }
  }
  assert.equal(requests, 12, 'all standardized chart data requests are checked');
});
