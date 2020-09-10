#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ react-snake

	Options
		--color color_name

	Examples
	  $ react-snake --color=ff00ff
`);

render(React.createElement(ui, cli.flags));
