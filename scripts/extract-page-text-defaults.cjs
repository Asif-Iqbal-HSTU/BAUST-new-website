// Regenerates database/data/page_text_defaults.json from the pageText() defaults in the
// department pages. Run from the repo root after changing page wording:
//   node scripts/extract-page-text-defaults.cjs
const fs = require('fs'), path = require('path');
const root = 'resources/js/pages';
const groups = { cse: 'Academic/Cse', ict: 'Academic/Ict', eee: 'Academic/Eee', me: 'Academic/Me', ipe: 'Academic/Ipe', ce: 'Academic/Ce', _generic: 'Department' };
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.tsx') ? [path.join(d, e.name)] : []);
function readArg(s, i) { // returns [text, endIndex] of one argument starting at i
  let depth = 0, j = i, q = null;
  for (; j < s.length; j++) {
    const c = s[j];
    if (q) { if (c === '\\') { j++; continue; } if (q === '`' && c === '$' && s[j + 1] === '{') { depth++; j++; continue; } if (c === q && depth === 0) q = null; else if (q === '`' && c === '}' && depth > 0) depth--; continue; }
    if (c === "'" || c === '"' || c === '`') { q = c; continue; }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') { if (depth === 0) return [s.slice(i, j), j]; depth--; }
    else if (c === ',' && depth === 0) return [s.slice(i, j), j];
  }
  throw new Error('unterminated');
}
const VARS = [
  [/^department\??\.name(\s*\|\|\s*.+)?$/, '{name}'], [/^deptName$/, '{name}'],
  [/^(shortName|short)$/, '{short_name}'], [/^department\??\.short_name(\s*\|\|\s*.+)?$/, '{short_name}'],
  [/^(labsList|allLabs)\.length$/, '{lab_count}'],
];
const warn = [];
function template(expr, file) {
  expr = expr.trim();
  if (/^'(?:[^'\\]|\\.)*'$/.test(expr) || /^"(?:[^"\\]|\\.)*"$/.test(expr)) return Function('return ' + expr)();
  if (/^department\??\.tagline\s*\|\|\s*''$/.test(expr)) return '{tagline}';
  if (expr.startsWith('`') && expr.endsWith('`')) {
    return expr.slice(1, -1).replace(/\$\{([^}]*)\}/g, (m, inner) => {
      const v = VARS.find(([re]) => re.test(inner.trim()));
      if (!v) { warn.push(`${file}: unknown \${${inner}}`); return m; }
      return v[1];
    }).replace(/\\`/g, '`');
  }
  warn.push(`${file}: unsupported default ${expr.slice(0, 60)}`); return null;
}
const out = {}, conflicts = [];
for (const [dept, dir] of Object.entries(groups)) {
  out[dept] = {};
  for (const file of walk(path.join(root, dir))) {
    const s = fs.readFileSync(file, 'utf8');
    let idx = 0;
    while ((idx = s.indexOf('pageText(', idx)) !== -1) {
      if (/function\s+$/.test(s.slice(Math.max(0, idx - 9), idx))) { idx++; continue; }
      let i = idx + 'pageText('.length;
      const [a1, e1] = readArg(s, i); const [a2, e2] = readArg(s, e1 + 1); const [a3] = readArg(s, e2 + 1);
      idx = e2;
      const key = a2.trim().replace(/^'|'$/g, '');
      const t = template(a3.replace(/,\s*$/, ''), file);
      if (t === null) continue;
      if (key in out[dept] && out[dept][key] !== t) conflicts.push(`${dept}.${key}: ${file}`);
      if (!(key in out[dept]) || out[dept][key] === '') out[dept][key] = t;
    }
  }
}
fs.writeFileSync('database/data/page_text_defaults.json', JSON.stringify(out, null, 2) + '\n');
console.log('warnings:', warn); console.log('conflicts:', conflicts);
for (const [d, m] of Object.entries(out)) console.log(d, Object.keys(m).join(','));
