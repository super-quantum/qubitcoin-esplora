import Snabbdom from 'snabbdom-pragma'
import search from './search'

export default ( t, isTouch, activeTab) =>
  <div className="sub-navbar">
    <div className="container sub-nav-container">
      <div className="sub-nav font-h4">
        <a href="." class={{ active: activeTab == 'dashBoard' }}>Dashboard</a>
        <a href="blocks/recent" class={{ active: activeTab == 'recentBlocks' }}>Blocks</a>
        <a href="tx/recent" class={{ active: activeTab == 'recentTxs' }}>Transactions</a>
        <a href="top-holders" class={{ active: activeTab == 'topHolders' }}>Top Holders</a>
        { process.env.IS_ELEMENTS ? <a href="assets" class={{ active: activeTab == 'assets' }}>Assets<sup className="highlight"></sup></a> : "" }
      </div>

      { search({ t, autofocus: !isTouch }) }
    </div>
  </div>