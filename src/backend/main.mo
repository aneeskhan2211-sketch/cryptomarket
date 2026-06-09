import MarketLib "lib/market";
import MarketApi "mixins/market-api";
import UsersLib "lib/users";
import UsersApi "mixins/users-api";
import Migration "migration";

// The persistent user maps survive upgrades. UserProfile already carries the
// optional `settings` field in the currently-deployed version, so the stable
// layout is unchanged and no migration is needed.
(with migration = Migration.run)
actor {
  transient let cache = MarketLib.newCache();
  transient let globalCache = MarketLib.newGlobalCache();
  transient let chartCache = MarketLib.newChartCache();
  transient let newsCache = MarketLib.newNewsCache();

  // Persistent user data — not transient, must survive upgrades
  let profileMap = UsersLib.newProfileMap();
  let watchlistMap = UsersLib.newWatchlistMap();
  let portfolioMap = UsersLib.newPortfolioMap();
  let tradeOrderMap = UsersLib.newTradeOrderMap();
  let alertMap = UsersLib.newAlertMap();

  include MarketApi(cache, globalCache, chartCache, newsCache);
  include UsersApi(profileMap, watchlistMap, portfolioMap, tradeOrderMap, alertMap);
};
