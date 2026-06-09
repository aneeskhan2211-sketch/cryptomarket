import UsersLib "../lib/users";
import Types "../types/users";

mixin (
  profiles : UsersLib.ProfileMap,
  watchlists : UsersLib.WatchlistMap,
  portfolio : UsersLib.PortfolioMap,
  tradeOrders : UsersLib.TradeOrderMap,
  alerts : UsersLib.AlertMap
) {

  /// Returns the caller's profile; creates a default one on first call.
  public shared ({ caller }) func getUserProfile() : async ?Types.UserProfile {
    ?UsersLib.getOrCreateProfile(profiles, caller);
  };

  /// Creates or updates the caller's profile.
  public shared ({ caller }) func updateUserProfile(
    input : Types.ProfileInput
  ) : async Types.UserProfile {
    UsersLib.upsertProfile(profiles, caller, input);
  };

  /// Returns the caller's app settings, or null if none have been saved.
  public shared query ({ caller }) func getUserSettings() : async ?Types.UserSettings {
    UsersLib.getSettings(profiles, caller);
  };

  /// Updates the caller's app settings (currency, language, theme, colorblind).
  public shared ({ caller }) func updateUserSettings(
    input : Types.SettingsInput
  ) : async Types.UserSettings {
    UsersLib.updateSettings(profiles, caller, input);
  };

  /// Returns the caller's watchlist (coin IDs).
  public shared query ({ caller }) func getWatchlist() : async [Text] {
    UsersLib.getWatchlist(watchlists, caller);
  };

  /// Replaces the caller's watchlist.
  public shared ({ caller }) func setWatchlist(
    coinIds : [Text]
  ) : async () {
    UsersLib.setWatchlist(watchlists, caller, coinIds);
  };

  /// Returns all portfolio transactions for the caller.
  public shared query ({ caller }) func getPortfolioTransactions() : async [Types.Transaction] {
    UsersLib.getPortfolioTransactions(portfolio, caller);
  };

  /// Replaces all portfolio transactions for the caller.
  public shared ({ caller }) func setPortfolioTransactions(
    txs : [Types.TransactionInput]
  ) : async () {
    UsersLib.setPortfolioTransactions(portfolio, caller, txs);
  };

  /// Returns all trade orders for the caller, sorted newest first.
  public shared query ({ caller }) func getTradeOrders() : async [Types.TradeOrder] {
    UsersLib.getTradeOrders(tradeOrders, caller);
  };

  /// Marks a pending trade order as completed and adds it to the portfolio.
  public shared ({ caller }) func completeTradeOrder(
    orderId : Text
  ) : async () {
    UsersLib.completeTradeOrder(tradeOrders, portfolio, caller, orderId);
  };

  /// Cancels a pending trade order (marks it as failed).
  public shared ({ caller }) func cancelTradeOrder(
    orderId : Text
  ) : async () {
    UsersLib.cancelTradeOrder(tradeOrders, caller, orderId);
  };

  /// Appends a new trade order for the caller.
  public shared ({ caller }) func addTradeOrder(
    order : Types.TradeOrder
  ) : async () {
    UsersLib.addTradeOrder(tradeOrders, caller, order);
  };

  /// Updates only the report preferences for the caller.
  public shared ({ caller }) func updateReportPrefs(
    input : Types.ReportPrefsInput
  ) : async Types.UserSettings {
    UsersLib.updateReportPrefs(profiles, caller, input);
  };
  /// Sets (creates or replaces) a price alert for the caller.
  public shared ({ caller }) func setPriceAlert(
    alert : Types.PriceAlert
  ) : async { #ok : (); #err : Text } {
    UsersLib.setPriceAlert(alerts, caller, alert);
  };

  /// Returns all price alerts for the caller.
  public shared query ({ caller }) func getPriceAlerts() : async [Types.PriceAlert] {
    UsersLib.getPriceAlerts(alerts, caller);
  };

  /// Deletes a price alert by ID for the caller.
  public shared ({ caller }) func deletePriceAlert(
    alertId : Text
  ) : async { #ok : (); #err : Text } {
    UsersLib.deletePriceAlert(alerts, caller, alertId);
  };

  /// Marks a price alert as triggered (or resets it) for the caller.
  public shared ({ caller }) func updatePriceAlert(
    alertId : Text,
    triggered : Bool
  ) : async { #ok : (); #err : Text } {
    UsersLib.updatePriceAlert(alerts, caller, alertId, triggered);
  };
};
