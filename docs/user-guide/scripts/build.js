#!/usr/bin/env node
/*
 * build.js — converts content/guide-content.md into data/content.json
 *
 * Usage:  node scripts/build.js
 *
 * The web app (app.js) reads data/content.json and renders the cards.
 * You never edit the JSON by hand — edit the Markdown, then re-run this.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'content', 'guide-content.md');
const OUT = path.join(ROOT, 'data', 'content.json');

function parse(md) {
  const lines = md.split(/\r?\n/);
  const doc = { title: 'RV Guide', tagline: '', model: '', sections: [] };

  let section = null;      // current section object
  let target = null;       // where blocks are written (section or subsection)
  let block = null;        // current block key: steps|tips|warnings|photos
  let inComment = false;

  const startBlock = (obj, key) => { if (!obj[key]) obj[key] = []; block = key; };

  for (let raw of lines) {
    const line = raw.replace(/\s+$/, '');

    // strip HTML comment blocks (the format docs at the top)
    if (line.includes('<!--')) inComment = true;
    if (inComment) { if (line.includes('-->')) inComment = false; continue; }

    if (!line.trim()) { block = null; continue; }

    // Title:  # Some Title
    let m = line.match(/^#\s+(.+)$/);
    if (m) { doc.title = m[1].trim(); continue; }

    // Metadata:  > key: value
    m = line.match(/^>\s*([a-zA-Z]+):\s*(.+)$/);
    if (m) { doc[m[1].trim()] = m[2].trim(); continue; }

    // Section:  ## [Category] Title {#id} {icon:name}
    m = line.match(/^##\s+(.+)$/);
    if (m) {
      let text = m[1];
      let category = '';
      let id = '';
      let icon = 'home';
      const cat = text.match(/^\[([^\]]+)\]\s*/);
      if (cat) { category = cat[1].trim(); text = text.slice(cat[0].length); }
      const idm = text.match(/\{#([^}]+)\}/);
      if (idm) { id = idm[1].trim(); text = text.replace(idm[0], ''); }
      const icm = text.match(/\{icon:([^}]+)\}/);
      if (icm) { icon = icm[1].trim(); text = text.replace(icm[0], ''); }
      const title = text.trim();
      if (!id) id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      section = { id, title, category, icon, quick: '', steps: [], tips: [], warnings: [], video: '', photos: [], subsections: [] };
      doc.sections.push(section);
      target = section;
      block = null;
      continue;
    }

    // Subsection:  ### Title
    m = line.match(/^###\s+(.+)$/);
    if (m && section) {
      const sub = { title: m[1].trim(), steps: [], tips: [], warnings: [], photos: [] };
      section.subsections.push(sub);
      target = sub;
      block = null;
      continue;
    }

    if (!target) continue;

    // Block labels
    m = line.match(/^\*\*Quick:\*\*\s*(.*)$/);
    if (m) { target.quick = m[1].trim(); block = null; continue; }

    m = line.match(/^\*\*Video:\*\*\s*(.*)$/);
    if (m) { target.video = m[1].trim(); block = null; continue; }

    if (/^\*\*Steps:\*\*/.test(line))    { startBlock(target, 'steps'); continue; }
    if (/^\*\*Tips:\*\*/.test(line))     { startBlock(target, 'tips'); continue; }
    if (/^\*\*Warnings:\*\*/.test(line)) { startBlock(target, 'warnings'); continue; }
    if (/^\*\*Photos:\*\*/.test(line))   { startBlock(target, 'photos'); continue; }

    // List items
    m = line.match(/^\s*\d+\.\s+(.+)$/);   // numbered
    if (m && block) {
      addItem(target, block, m[1].trim());
      continue;
    }
    m = line.match(/^\s*[-*]\s+(.+)$/);    // bullet
    if (m && block) {
      addItem(target, block, m[1].trim());
      continue;
    }

    // continuation line appended to last item
    if (block && Array.isArray(target[block]) && target[block].length) {
      const arr = target[block];
      const last = arr[arr.length - 1];
      if (block === 'photos') { last.caption = (last.caption + ' ' + line.trim()).trim(); }
      else { arr[arr.length - 1] = last + ' ' + line.trim(); }
    }
  }
  return doc;
}

function addItem(target, block, text) {
  if (block === 'photos') {
    const parts = text.split('|');
    target.photos.push({ src: parts[0].trim(), caption: (parts[1] || '').trim() });
  } else {
    target[block].push(text);
  }
}

function main() {
  if (!fs.existsSync(SRC)) { console.error('Missing source:', SRC); process.exit(1); }
  const md = fs.readFileSync(SRC, 'utf8');
  const doc = parse(md);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(doc, null, 2));
  const catCount = new Set(doc.sections.map(s => s.category)).size;
  console.log(`Built ${OUT}`);
  console.log(`  Title:    ${doc.title}`);
  console.log(`  Sections: ${doc.sections.length}`);
  console.log(`  Categories: ${catCount}`);
}

main();
