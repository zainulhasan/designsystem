/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { types: t } = require('@wfp/scss-generator');
const { formatTokenName } = process.env.sourceLib
  ? require(process.env.sourceLib)
  : require('../../lib');

const FILE_BANNER = t.Comment(` Code generated by @wfp/themes. DO NOT EDIT.

 Copyright IBM Corp. 2018, 2019

 This source code is licensed under the Apache-2.0 license found in the
 LICENSE file in the root directory of this source tree.
`);

function primitive(value, name) {
  if (typeof value === 'string') {
    if (value[0] === '#') {
      return t.SassColor(value);
    }
    if (
      value.endsWith('px') ||
      value.endsWith('em') ||
      value.endsWith('%') ||
      value.endsWith('vw') ||
      value.endsWith('vh') ||
      value.startsWith('rgb') ||
      value === '0'
    ) {
      return t.SassValue(value);
    }
    return t.SassValue(`unquote("${value}")`);
  }
  if (typeof value === 'number') {
    return t.SassNumber(value);
  }
  if (Array.isArray(value)) {
    return t.SassList({
      elements: value.map(primitive),
    });
  }
  if (typeof value === 'object') {
    return t.SassMap({
      properties: Object.keys(value).map((key) => {
        const quoted = key.includes(' ');
        const identifier = quoted
          ? t.Identifier(key)
          : t.Identifier(formatTokenName(key));
        return t.SassMapProperty({
          key: identifier,
          value: primitive(value[key]),
          quoted,
        });
      }),
    });
  }

  console.warn(`Unknown primitive type for ${typeof value} from ${name}`);
  //throw new Error(`Unknown primitive type for ${typeof value} from ${name}`);
}

module.exports = {
  FILE_BANNER,
  primitive,
};
