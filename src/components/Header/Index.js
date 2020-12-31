import React from 'react';
import common from '../../styles/Common.module.scss';

const Header = () => {
  return (
    <React.Fragment>
      <header className={common.header}>
        <h1 className={common.header_text}>建設マネジメントシステム</h1>
      </header>
      <div className={common.management}>
        <h2 className={common.management_text}>システム 開発者 (カテル有限会社)</h2>
      </div>
    </React.Fragment>
  );
};

export default Header;
