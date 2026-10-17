// Präfixiert absolute Pfade (/images/...) in Markdown-Inhalten mit dem Base-Path,
// damit Bilder und Links aus dem CMS auch unter einem Unterpfad funktionieren.
export default function rehypeBasePath({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  const fix = (value) =>
    typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && prefix && !value.startsWith(prefix + '/')
      ? prefix + value
      : value;

  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      if ('src' in node.properties) node.properties.src = fix(node.properties.src);
      if ('href' in node.properties) node.properties.href = fix(node.properties.href);
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}
