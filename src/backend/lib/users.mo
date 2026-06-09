import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/users";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

module {
  public type ProfileMap = Map.Map<Types.UserId, Types.UserProfile>;
  public type WatchlistMap = Map.Map<Types.UserId, [Text]>;
  public type PortfolioMap = Map.Map<Types.UserId, [Types.Transaction]>;
  public type TradeOrderMap = Map.Map<Types.UserId, [Types.TradeOrder]>;  public type AlertMap = Map.Map<Types.UserId, [Types.PriceAlert]>;

  public func newAlertMap() : AlertMap {
    Map.empty<Types.UserId, [Types.PriceAlert]>();
  };

  public func newProfileMap() : ProfileMap {
    Map.empty<Types.UserId, Types.UserProfile>();
  };

  public func newWatchlistMap() : WatchlistMap {
    Map.empty<Types.UserId, [Text]>();
  };

  public func newPortfolioMap() : PortfolioMap {
    Map.empty<Types.UserId, [Types.Transaction]>();
  };

  public func newTradeOrderMap() : TradeOrderMap {
    Map.empty<Types.UserId, [Types.TradeOrder]>();
  };

  // ── Price alert stubs ────────────────────────────────────────────────

  public func setPriceAlert(
    alerts : AlertMap,
    caller : Types.UserId,
    alert : Types.PriceAlert
  ) : { #ok : (); #err : Text } {
    let existing = switch (alerts.get(caller)) {
      case (?arr) arr;
      case null [];
    };
    // Generate composite id: coinId#createdAt
    let id = alert.coinId # "#" # alert.createdAt.toText();
    let newAlert : Types.PriceAlert = { alert with id };
    // Replace if same id exists, otherwise append
    var replaced = false;
    let updated = existing.map(
      func(a : Types.PriceAlert) : Types.PriceAlert {
        if (a.id == id) { replaced := true; newAlert } else { a };
      }
    );
    let final = if (replaced) updated else updated.concat([newAlert]);
    alerts.add(caller, final);
    #ok ();
  };

  public func getPriceAlerts(
    alerts : AlertMap,
    caller : Types.UserId
  ) : [Types.PriceAlert] {
    switch (alerts.get(caller)) {
      case (?arr) arr;
      case null [];
    };
  };

  public func deletePriceAlert(
    alerts : AlertMap,
    caller : Types.UserId,
    alertId : Text
  ) : { #ok : (); #err : Text } {
    let existing = switch (alerts.get(caller)) {
      case (?arr) arr;
      case null return #err "No alerts found";
    };
    let filtered = existing.filter(func(a : Types.PriceAlert) : Bool { a.id != alertId });
    if (filtered.size() == existing.size()) {
      return #err ("Alert not found: " # alertId);
    };
    alerts.add(caller, filtered);
    #ok ();
  };

  public func updatePriceAlert(
    alerts : AlertMap,
    caller : Types.UserId,
    alertId : Text,
    triggered : Bool
  ) : { #ok : (); #err : Text } {
    let existing = switch (alerts.get(caller)) {
      case (?arr) arr;
      case null return #err "No alerts found";
    };
    var found = false;
    let updated = existing.map(
      func(a : Types.PriceAlert) : Types.PriceAlert {
        if (a.id == alertId) { found := true; { a with triggered } } else { a };
      }
    );
    if (not found) {
      return #err ("Alert not found: " # alertId);
    };
    alerts.add(caller, updated);
    #ok ();
  };

  /// Returns existing profile or creates a new one with default empty fields.
  public func getOrCreateProfile(
    profiles : ProfileMap,
    caller : Types.UserId
  ) : Types.UserProfile {
    switch (profiles.get(caller)) {
      case (?existing) existing;
      case null {
        let profile : Types.UserProfile = {
          id = caller;
          username = "";
          displayName = "";
          profilePictureUrl = null;
          createdAt = Time.now();
          settings = null;
        };
        profiles.add(caller, profile);
        profile;
      };
    };
  };

  /// Updates or creates the user profile for the given caller.
  public func upsertProfile(
    profiles : ProfileMap,
    caller : Types.UserId,
    input : Types.ProfileInput
  ) : Types.UserProfile {
    let existing = getOrCreateProfile(profiles, caller);
    let updated : Types.UserProfile = {
      existing with
      username = input.username;
      displayName = input.displayName;
      profilePictureUrl = input.profilePictureUrl;
    };
    profiles.add(caller, updated);
    updated;
  };

  /// Returns the stored settings for the user, or null if none set yet.
  public func getSettings(
    profiles : ProfileMap,
    caller : Types.UserId
  ) : ?Types.UserSettings {
    switch (profiles.get(caller)) {
      case (?p) p.settings;
      case null null;
    };
  };

  // Default report preferences
  let defaultReportPrefs : Types.ReportPrefs = {
    defaultChartDays = 30;
    roundingDecimals = 2;
  };

  /// Stores the user's settings on their profile (creating the profile first).
  public func updateSettings(
    profiles : ProfileMap,
    caller : Types.UserId,
    input : Types.SettingsInput
  ) : Types.UserSettings {
    let existing = getOrCreateProfile(profiles, caller);
    // Preserve existing reportPrefs when only updating display settings
    let existingReportPrefs = switch (existing.settings) {
      case (?s) s.reportPrefs;
      case null defaultReportPrefs;
    };
    let value : Types.UserSettings = {
      currency = input.currency;
      language = input.language;
      theme = input.theme;
      colorblind = input.colorblind;
      reportPrefs = existingReportPrefs;
    };
    let updated : Types.UserProfile = { existing with settings = ?value };
    profiles.add(caller, updated);
    value;
  };

  /// Updates only the report preferences portion of the user's settings.
  public func updateReportPrefs(
    profiles : ProfileMap,
    caller : Types.UserId,
    input : Types.ReportPrefsInput
  ) : Types.UserSettings {
    let existing = getOrCreateProfile(profiles, caller);
    let existingSettings = switch (existing.settings) {
      case (?s) s;
      case null {
        {
          currency = "usd";
          language = "en";
          theme = "system";
          colorblind = false;
          reportPrefs = defaultReportPrefs;
        };
      };
    };
    let newPrefs : Types.ReportPrefs = {
      defaultChartDays = input.defaultChartDays;
      roundingDecimals = input.roundingDecimals;
    };
    let value : Types.UserSettings = { existingSettings with reportPrefs = newPrefs };
    let updated : Types.UserProfile = { existing with settings = ?value };
    profiles.add(caller, updated);
    value;
  };
  public func getWatchlist(
    watchlists : WatchlistMap,
    caller : Types.UserId
  ) : [Text] {
    switch (watchlists.get(caller)) {
      case (?list) list;
      case null [];
    };
  };

  /// Replaces the watchlist for the given user.
  public func setWatchlist(
    watchlists : WatchlistMap,
    caller : Types.UserId,
    coinIds : [Text]
  ) : () {
    watchlists.add(caller, coinIds);
  };

  /// Returns all portfolio transactions for the given user.
  public func getPortfolioTransactions(
    portfolio : PortfolioMap,
    caller : Types.UserId
  ) : [Types.Transaction] {
    switch (portfolio.get(caller)) {
      case (?txs) txs;
      case null [];
    };
  };

  /// Returns all trade orders for the given user.
  /// Returns all trade orders for the given user, sorted by timestamp descending (newest first).
  public func getTradeOrders(
    tradeOrders : TradeOrderMap,
    caller : Types.UserId
  ) : [Types.TradeOrder] {
    let orders = switch (tradeOrders.get(caller)) {
      case (?orders) orders;
      case null [];
    };
    orders.sort(func(a, b) = Int.compare(b.timestamp, a.timestamp));
  };

  /// Appends a new trade order for the given user.
  public func addTradeOrder(
    tradeOrders : TradeOrderMap,
    caller : Types.UserId,
    order : Types.TradeOrder
  ) : () {
    let existing = switch (tradeOrders.get(caller)) {
      case (?orders) orders;
      case null [];
    };
    let appended = existing.concat([order]);
    tradeOrders.add(caller, appended);
  };

  /// Replaces all portfolio transactions for the given user.
  /// Replaces all portfolio transactions for the given user.
  public func setPortfolioTransactions(
    portfolio : PortfolioMap,
    caller : Types.UserId,
    txs : [Types.TransactionInput]
  ) : () {
    let stored : [Types.Transaction] = txs.map<Types.TransactionInput, Types.Transaction>(
      func(t) : Types.Transaction {
        {
          id = t.id;
          coinId = t.coinId;
          coinSymbol = t.coinSymbol;
          coinName = t.coinName;
          transactionType = t.transactionType;
          amount = t.amount;
          pricePerCoin = t.pricePerCoin;
          timestamp = t.timestamp;
          notes = t.notes;
        };
      }
    );
    portfolio.add(caller, stored);
  };

  /// Marks a trade order as #completed and appends a matching Transaction to the portfolio.
  public func completeTradeOrder(
    tradeOrders : TradeOrderMap,
    portfolio : PortfolioMap,
    caller : Types.UserId,
    orderId : Text
  ) : () {
    let orders = switch (tradeOrders.get(caller)) {
      case (?orders) orders;
      case null Runtime.trap("No orders found");
    };
    var found = false;
    let updated = orders.map(
      func(o) : Types.TradeOrder {
        if (o.id == orderId) {
          found := true;
          { o with status = #completed };
        } else { o };
      }
    );
    if (not found) Runtime.trap("Order not found: " # orderId);
    tradeOrders.add(caller, updated);
    // Find the completed order to build the transaction
    let order = switch (updated.find(func(o : Types.TradeOrder) : Bool { o.id == orderId })) {
      case (?o) o;
      case null Runtime.trap("Unreachable");
    };
    let txType : Types.TransactionType = switch (order.orderType) {
      case (#buy) #buy;
      case (#sell) #sell;
    };
    let txId = order.timestamp.toText() # "-" # order.coinId;
    let newTx : Types.Transaction = {
      id = txId;
      coinId = order.coinId;
      coinSymbol = order.coinSymbol;
      coinName = order.coinSymbol; // use symbol as name fallback
      transactionType = txType;
      amount = order.coinQuantity;
      pricePerCoin = order.priceAtExecution;
      timestamp = order.timestamp;
      notes = null;
    };
    let existingTxs = switch (portfolio.get(caller)) {
      case (?txs) txs;
      case null [];
    };
    portfolio.add(caller, existingTxs.concat([newTx]));
  };

  /// Marks a trade order as #failed (cancelled).
  public func cancelTradeOrder(
    tradeOrders : TradeOrderMap,
    caller : Types.UserId,
    orderId : Text
  ) : () {
    let orders = switch (tradeOrders.get(caller)) {
      case (?orders) orders;
      case null Runtime.trap("No orders found");
    };
    var found = false;
    let updated = orders.map(
      func(o) : Types.TradeOrder {
        if (o.id == orderId) {
          found := true;
          { o with status = #failed };
        } else { o };
      }
    );
    if (not found) Runtime.trap("Order not found: " # orderId);
    tradeOrders.add(caller, updated);
  };
};
