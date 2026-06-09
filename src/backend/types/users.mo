import CommonTypes "common";

module {
  public type UserId = Principal;

  // App-wide user preferences, stored as an optional field on the user's
  // profile. The currently-deployed canister already includes this field, so
  // the stable layout is unchanged.
  public type UserSettings = {
    // Display currency code, e.g. "usd", "eur", "btc", "eth", "sol", "bnb", "xrp"
    currency : Text;
    // UI language code, e.g. "en", "de", "es", "fr"
    language : Text;
    // "light" | "dark" | "system"
    theme : Text;
    // Colorblind mode: shift green->blue for up/down indicators
    colorblind : Bool;
    // Report/analytics preferences
    reportPrefs : ReportPrefs;
  };

  public type UserProfile = {
    id : UserId;
    username : Text;
    displayName : Text;
    profilePictureUrl : ?Text;
    createdAt : CommonTypes.Timestamp;
    settings : ?UserSettings;
  };

  // Stored per-user in the portfolio map
  public type Transaction = {
    id : Text;
    coinId : Text;
    coinSymbol : Text;
    coinName : Text;
    transactionType : TransactionType;
    amount : Float;
    pricePerCoin : Float;
    timestamp : CommonTypes.Timestamp;
    notes : ?Text;
  };

  public type TransactionType = { #buy; #sell };

  // A price alert set by the user for a specific coin
  public type PriceAlert = {
    id : Text;
    coinId : Text;
    coinName : Text;
    targetPrice : Float;
    direction : { #above; #below };
    triggered : Bool;
    createdAt : Int;
  };

  // Input for creating or updating a profile
  public type ProfileInput = {
    username : Text;
    displayName : Text;
    profilePictureUrl : ?Text;
  };

  // Input for updating just the settings portion of a profile
  public type SettingsInput = {
    currency : Text;
    language : Text;
    theme : Text;
    colorblind : Bool;
  };

  // Report/analytics preferences stored inside UserSettings
  public type ReportPrefs = {
    defaultChartDays : Nat;
    roundingDecimals : Nat;
  };

  // Input for updating only the report preferences
  public type ReportPrefsInput = {
    defaultChartDays : Nat;
    roundingDecimals : Nat;
  };

  // Status of a trade order
  public type OrderStatus = { #pending; #completed; #failed };

  // Type of a trade order
  public type OrderType = { #buy; #sell };

  // A buy or sell trade order placed by the user
  public type TradeOrder = {
    id : Text;
    coinId : Text;
    coinSymbol : Text;
    orderType : OrderType;
    fiatAmount : Float;
    coinQuantity : Float;
    priceAtExecution : Float;
    stripePaymentIntentId : ?Text;
    status : OrderStatus;
    timestamp : Int;
  };

  // Input for a single transaction when setting the portfolio
  public type TransactionInput = {
    id : Text;
    coinId : Text;
    coinSymbol : Text;
    coinName : Text;
    transactionType : TransactionType;
    amount : Float;
    pricePerCoin : Float;
    timestamp : CommonTypes.Timestamp;
    notes : ?Text;
  };
};
