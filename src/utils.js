function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  }
  if (name[0] === '-') {
    return prefix + name;
  }
  return `${prefix}__${name}`;
}

export default function classNames(
  prefix,
  cssKey,
  state,
  className,
) {
  const arr = [cssKey, className];
  if (state && prefix) {
    Object.keys(state).forEach(((key) => {
      if (state[key]) {
        arr.push(`${applyPrefixToName(prefix, key)}`);
      }
    }));
  }

  return arr.filter(i => i).map(i => String(i).trim()).join(' ');
}
