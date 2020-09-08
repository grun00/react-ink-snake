'use strict';
const React = require('react');
const {Text, Color, Box} = require('ink');
const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()]

const App = ({name = 'Stranger'}) => (
  <Box>
    <Text color='green'>Vim</Text><Text color='red'>Snake</Text>
  </Box>
);

module.exports = App;
