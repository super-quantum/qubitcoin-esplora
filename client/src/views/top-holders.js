import Snabbdom from 'snabbdom-pragma'
import layout from './layout'
import { roundNumber } from './util'


export default ({ t, loading, error, page, topHolders: holders, ...S }) => {
  if (loading) {
    return layout(
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t`Loading...`}</span>
          </div>
        </div>
      </div>
    , { t, page, activeTab: 'topHolders', ...S })
  }

  if (error) {
    return layout(
      <div className="container mt-4">
        <div className="alert alert-danger">{t`Error: ${error}`}</div>
      </div>
    , { t, page, activeTab: 'topHolders', ...S })
  }

  return layout(
    <div className="container mt-4">
      <div className="holders-container">
        { !holders ? <div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">{t`Loading...`}</span></div></div>
        : !holders.length ? <p>{t`No top holders data`}</p>
        : <div className="holders-table">
            <h3 className="table-title font-h3">{t`Top 100 Qubitcoin Addresses by Balance`}</h3>
            <div className="holders-table-row header">
              <div className="holders-table-cell font-h4">#</div>
              <div className="holders-table-cell font-h4">{t`Address`}</div>
              <div className="holders-table-cell font-h4">{t`Balance`}</div>
              <div className="holders-table-cell font-h4">{t`Percentage`}</div>
              <div className="holders-table-cell font-h4">{t`Txn Count`}</div>
            </div>
            {holders.map(holder => 
              <div className="holders-table-link-row" key={holder.rank}>
                <a className="holders-table-row holder-data" href={holder.address.startsWith('scripthash:') 
                  ? `/scripthash/${holder.address.replace('scripthash:', '')}` 
                  : `/address/${holder.address}`}>
                  <div className="holders-table-cell" data-label={t`Rank`}>{holder.rank}</div>
                  <div className="holders-table-cell highlighted-text" data-label={t`Address`}>{holder.address.slice(0, 10)}...{holder.address.slice(-10)}</div>
                  <div className="holders-table-cell" data-label={t`Balance`}>
                    <span className="font-weight-bold">{roundNumber(holder.balance, 4)} QTC</span>
                  </div>
                  <div className="holders-table-cell" data-label={t`Percentage`}>{holder.percentage}%</div>
                  <div className="holders-table-cell" data-label={t`Txn Count`}>{holder.tx_count}</div>
                </a>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  , { t, page, activeTab: 'topHolders', ...S })
} 