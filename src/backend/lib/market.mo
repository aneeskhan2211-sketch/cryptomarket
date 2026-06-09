import Types "../types/market";
import Common "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
  // ---------- Per-page coin cache ----------
  //
  // We now load the market in pages of up to 250 coins each. The user can lazy-
  // load further pages via "Mehr laden". To keep things simple the cache holds
  // a Map from page-number to its last successful snapshot. TTL is checked
  // separately per page.

  public type PageEntry = {
    var coins : [Types.Coin];
    var fetchedAt : Int;
    perPage : Nat;
  };

  public type CoinCache = {
    pages : Map.Map<Nat, PageEntry>;
  };

  public func newCache() : CoinCache {
    { pages = Map.empty<Nat, PageEntry>() };
  };

  func getPage(cache : CoinCache, page : Nat) : ?PageEntry {
    cache.pages.get(page);
  };

  public func isFresh(cache : CoinCache, page : Nat, ttlNanos : Int, now : Int) : Bool {
    switch (getPage(cache, page)) {
      case (?entry) entry.fetchedAt > 0 and (now - entry.fetchedAt) < ttlNanos;
      case null false;
    };
  };

  public func updateCache(
    cache : CoinCache,
    page : Nat,
    perPage : Nat,
    coins : [Types.Coin],
    now : Int,
  ) : () {
    switch (getPage(cache, page)) {
      case (?entry) {
        entry.coins := coins;
        entry.fetchedAt := now;
      };
      case null {
        cache.pages.add(page, {
          var coins = coins;
          var fetchedAt = now;
          perPage;
        });
      };
    };
  };

  public func buildResponse(
    cache : CoinCache,
    page : Nat,
  ) : Common.ApiResult<Types.MarketResponse> {
    switch (getPage(cache, page)) {
      case (?entry) #ok {
        coins = entry.coins;
        page;
        perPage = entry.perPage;
        updatedAt = entry.fetchedAt;
      };
      case null #err ("Page " # page.toText() # " not yet loaded");
    };
  };

  public func hasAnyPage(cache : CoinCache) : Bool {
    cache.pages.size() > 0;
  };

  // ---------- Global stats cache ----------

  public type GlobalCache = {
    var stats : ?Types.GlobalStats;
    var fetchedAt : Int;
  };

  public func newGlobalCache() : GlobalCache {
    { var stats = null; var fetchedAt = 0 };
  };

  public func isGlobalFresh(cache : GlobalCache, ttlNanos : Int, now : Int) : Bool {
    cache.fetchedAt > 0 and (now - cache.fetchedAt) < ttlNanos;
  };

  public func updateGlobalCache(cache : GlobalCache, stats : Types.GlobalStats, now : Int) : () {
    cache.stats := ?stats;
    cache.fetchedAt := now;
  };

  public func buildGlobalResponse(cache : GlobalCache) : Common.ApiResult<Types.GlobalResponse> {
    switch (cache.stats) {
      case (?s) #ok { stats = s; updatedAt = cache.fetchedAt };
      case null #err ("Global stats not yet loaded");
    };
  };

  // ---------- Chart cache ----------
  //
  // Coin-level chart data fetched on demand. Key encodes coinId + days + kind.

  public type ChartEntry = {
    var data : Types.ChartData;
    var fetchedAt : Int;
  };

  public type ChartCache = {
    entries : Map.Map<Text, ChartEntry>;
  };

  public func newChartCache() : ChartCache {
    { entries = Map.empty<Text, ChartEntry>() };
  };

  public func chartKey(coinId : Text, days : Nat, kind : Types.ChartKind) : Text {
    let k = switch kind { case (#line) "L"; case (#candle) "C" };
    coinId # ":" # days.toText() # ":" # k;
  };

  public func getChart(cache : ChartCache, key : Text) : ?ChartEntry {
    cache.entries.get(key);
  };

  public func isChartFresh(cache : ChartCache, key : Text, ttlNanos : Int, now : Int) : Bool {
    switch (getChart(cache, key)) {
      case (?entry) entry.fetchedAt > 0 and (now - entry.fetchedAt) < ttlNanos;
      case null false;
    };
  };

  public func updateChartCache(cache : ChartCache, key : Text, data : Types.ChartData, now : Int) : () {
    switch (getChart(cache, key)) {
      case (?entry) {
        entry.data := data;
        entry.fetchedAt := now;
      };
      case null {
        cache.entries.add(key, {
          var data;
          var fetchedAt = now;
        });
      };
    };
  };

  public func buildChartResponse(cache : ChartCache, key : Text) : Common.ApiResult<Types.ChartData> {
    switch (getChart(cache, key)) {
      case (?entry) #ok (entry.data);
      case null #err ("Chart not yet loaded: " # key);
    };
  };
  // ---------- News cache ----------
  // Per-query news cache keyed by coinId (or "general"). TTL is 5 minutes.

  public type NewsEntry = {
    var items : [Types.NewsItem];
    var fetchedAt : Int;
  };

  public type NewsCache = {
    entries : Map.Map<Text, NewsEntry>;
  };

  public func newNewsCache() : NewsCache {
    { entries = Map.empty<Text, NewsEntry>() };
  };

  public func isNewsFresh(cache : NewsCache, key : Text, ttlNanos : Int, now : Int) : Bool {
    switch (cache.entries.get(key)) {
      case (?entry) entry.fetchedAt > 0 and (now - entry.fetchedAt) < ttlNanos;
      case null false;
    };
  };

  public func updateNewsCache(cache : NewsCache, key : Text, items : [Types.NewsItem], now : Int) : () {
    switch (cache.entries.get(key)) {
      case (?entry) { entry.items := items; entry.fetchedAt := now };
      case null {
        cache.entries.add(key, { var items; var fetchedAt = now });
      };
    };
  };

  public func buildNewsResponse(cache : NewsCache, key : Text) : Common.ApiResult<[Types.NewsItem]> {
    switch (cache.entries.get(key)) {
      case (?entry) #ok (entry.items);
      case null #err ("News not yet loaded for: " # key);
    };
  };
};
