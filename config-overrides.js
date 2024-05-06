const { override, useBabelRc } = import('customize-cra');
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
);
