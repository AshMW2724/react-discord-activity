import { ReactNode, ReactElement, Fragment } from 'react';

interface Props {
  children: ReactNode | ((i: number) => ReactNode);
  amount: number;
}

export default function Repeat({ children, amount }: Props): ReactElement {
  const repeat = new Array(amount).fill(0);
  return (
    <>
      {repeat.map((e, i) => (
        <Fragment key={i}>{typeof children === 'function' ? children(i) : children}</Fragment>
      ))}
    </>
  );
}
