import Snabbdom from 'snabbdom-pragma'
import layout from './layout'
import { roundNumber } from './util'

// Mock data for top holders - in real implementation this would come from API
const mockTopHolders = [
  {
    rank: 1,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 1234567890123, // in satoshis
    tx_count: 156,
    percentage: 0.85
  },
  {
    rank: 2,
    address: 'scripthash:d53021947dbe9c5cd8521edf2f599282b9affe9fe017aa7b9215faa48aa70fd6',
    balance: 987654321098,
    tx_count: 89,
    percentage: 0.68
  },
  {
    rank: 3,
    address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    balance: 654321098765,
    tx_count: 234,
    percentage: 0.45
  },
  {
    rank: 4,
    address: 'bc1q0d0446ng8eh6n40h2nq5e46q5q5q5q5q5q5q5',
    balance: 543210987654,
    tx_count: 67,
    percentage: 0.37
  },
  {
    rank: 5,
    address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    balance: 432109876543,
    tx_count: 123,
    percentage: 0.29
  },
  {
    rank: 6,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 321098765432,
    tx_count: 45,
    percentage: 0.22
  },
  {
    rank: 7,
    address: '1FvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    balance: 210987654321,
    tx_count: 78,
    percentage: 0.15
  },
  {
    rank: 8,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 109876543210,
    tx_count: 34,
    percentage: 0.08
  },
  {
    rank: 9,
    address: '1CvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    balance: 98765432109,
    tx_count: 56,
    percentage: 0.06
  },
  {
    rank: 10,
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 87654321098,
    tx_count: 23,
    percentage: 0.04
  }
]

export default ({ t, /* loading, error, */ page, /* topHolders, */ ...S }) => {
  // TODO: Uncomment when top-holders endpoint is implemented
  // Use API data if available, otherwise fall back to mock data
  // const holders = topHolders || mockTopHolders
  
  // For now, always use mock data since endpoint is not implemented
  const holders = mockTopHolders
  
  // TODO: Uncomment when top-holders endpoint is implemented
  /*
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
  */

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
                    <span className="font-weight-bold">{roundNumber(holder.balance, 4)} QBTC</span>
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