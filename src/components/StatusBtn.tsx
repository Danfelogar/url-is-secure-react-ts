import { FC } from 'react';

interface StatusBtnProps {
  statusLabel: string;
  type: 'unknown' | 'premium' | 'protected' | 'not-protected';
}

export const StatusBtn: FC<StatusBtnProps> = ({ statusLabel, type }) => {
  return (
    <div className="badges">
      <button
        className={`${type === 'unknown' && 'blue'} ${type === 'premium' && 'yellow'} ${type === 'protected' && 'green'} ${type === 'not-protected' && 'red'}`}
      >
        {statusLabel}
      </button>
      {/* <button className="blue">Unknown</button>
      <button className="yellow">Premiun privileges</button>
      <button className="green">Protected</button>
      <button className="red">Not Protected</button> */}
    </div>
  );
};
