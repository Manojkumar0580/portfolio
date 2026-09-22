import {writeFileSync} from 'node:fs';
import {projects} from '../src/data/projects.js';
const site=(process.env.SITE_URL||'http://localhost:5173').replace(/\/$/,'');
const paths=['/',...projects.map(p=>`/projects/${p.slug}`)];
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path=>`  <url><loc>${site}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml',import.meta.url),xml);
