import { Children, type ReactNode } from 'react';

function RollingLabel({ text }: { text: string }) {
  return <span className="rolling-label"><span className="sr-only">{text}</span><span className="rolling-label-track" aria-hidden="true"><span>{text}</span><span>{text}</span></span></span>;
}

export function ActionContent({ kind, children }: { kind: 'fill' | 'roll'; children: ReactNode }) {
  if (kind === 'fill') return <><span className="button-content">{children}</span><span className="button-fill" aria-hidden="true"><span className="button-content">{children}</span></span></>;
  const content: ReactNode[] = [];
  let text = '';
  const flush = () => { if (text) { content.push(<RollingLabel key={`label-${content.length}`} text={text} />); text = ''; } };
  for (const child of Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') text += child;
    else { flush(); content.push(child); }
  }
  flush();
  return <>{content}</>;
}
