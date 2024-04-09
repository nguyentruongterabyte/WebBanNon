const { override, useBabelRc } = imp'customize-cra');
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
);
