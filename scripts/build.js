#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pkg = require(path.join(rootDir, 'package.json'));
const repo = pkg.repository?.url?.replace(/^git\+/, '').replace(/\.git$/, '') || pkg.homepage || 'https://github.com/hksm-app/api-ui';
const getFullYear = () => new Date().getFullYear();

const banner = `/*!
 * Hikasami Api UI v${pkg.version} (https://github.com/hksm-app/api-ui)
 * Copyright ${getFullYear()} Hikasami Development
 * Licensed under Apache License 2.0 (https://github.com/hksm-app/api-ui/blob/master/LICENSE)
 */`;

const distDir = path.join(rootDir, 'dist');

// Minify JS with terser + banner (strip source comments, we add our own)
execSync('terser dist/api-ui.js -o dist/api-ui.min.js -c -m --comments false', { stdio: 'inherit', cwd: rootDir });
const jsMin = fs.readFileSync(path.join(distDir, 'api-ui.min.js'), 'utf8');
fs.writeFileSync(path.join(distDir, 'api-ui.min.js'), banner + jsMin);

// Minify CSS with cleancss + banner
execSync('cleancss -o dist/api-ui.min.css dist/api-ui.css', { stdio: 'inherit', cwd: rootDir });
const cssMin = fs.readFileSync(path.join(distDir, 'api-ui.min.css'), 'utf8');
const cssBanner = `/*! @hikasami/api-ui v${pkg.version} | ${repo} | Apache-2.0 */\n`;
fs.writeFileSync(path.join(distDir, 'api-ui.min.css'), cssBanner + cssMin);

console.log('Build complete: api-ui.min.js, api-ui.min.css');
