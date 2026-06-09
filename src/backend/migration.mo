import Map "mo:core/Map";
import NewTypes "types/users";

module {
  // Old inline types — matching the previously-deployed stable signature.
  // The previous migration already ran: Transaction.id is Text, UserSettings
  // already has reportPrefs, and tradeOrderMap exists. We only need to add
  // alertMap.
  type OldUserId = Principal;
  type OldTimestamp = Int;

  type OldReportPrefs = {
    defaultChartDays : Nat;
    roundingDecimals : Nat;
  };

  type OldUserSettings = {
    currency : Text;
    language : Text;
    theme : Text;
    colorblind : Bool;
    reportPrefs : OldReportPrefs;
  };

  type OldUserProfile = {
    id : OldUserId;
    username : Text;
    displayName : Text;
    profilePictureUrl : ?Text;
    createdAt : OldTimestamp;
    settings : ?OldUserSettings;
  };

  type OldTransactionType = { #buy; #sell };

  type OldTransaction = {
    id : Text;
    coinId : Text;
    coinSymbol : Text;
    coinName : Text;
    transactionType : OldTransactionType;
    amount : Float;
    pricePerCoin : Float;
    timestamp : OldTimestamp;
    notes : ?Text;
  };

  type OldOrderStatus = { #pending; #completed; #failed };
  type OldOrderType = { #buy; #sell };

  type OldTradeOrder = {
    id : Text;
    coinId : Text;
    coinSymbol : Text;
    orderType : OldOrderType;
    fiatAmount : Float;
    coinQuantity : Float;
    priceAtExecution : Float;
    stripePaymentIntentId : ?Text;
    status : OldOrderStatus;
    timestamp : Int;
  };

  // OldActor matches the deployed stable signature (output of the previous
  // migration run): profileMap + watchlistMap + portfolioMap + tradeOrderMap.
  type OldActor = {
    profileMap : Map.Map<OldUserId, OldUserProfile>;
    watchlistMap : Map.Map<OldUserId, [Text]>;
    portfolioMap : Map.Map<OldUserId, [OldTransaction]>;
    tradeOrderMap : Map.Map<OldUserId, [OldTradeOrder]>;
  };

  // NewActor adds alertMap to the deployed fields.
  type NewActor = {
    profileMap : Map.Map<NewTypes.UserId, NewTypes.UserProfile>;
    watchlistMap : Map.Map<NewTypes.UserId, [Text]>;
    portfolioMap : Map.Map<NewTypes.UserId, [NewTypes.Transaction]>;
    tradeOrderMap : Map.Map<NewTypes.UserId, [NewTypes.TradeOrder]>;
    alertMap : Map.Map<NewTypes.UserId, [NewTypes.PriceAlert]>;
  };

  // All existing fields are type-compatible pass-throughs; only alertMap is new.
  public func run(old : OldActor) : NewActor {
    let alertMap = Map.empty<NewTypes.UserId, [NewTypes.PriceAlert]>();
    {
      profileMap = old.profileMap;
      watchlistMap = old.watchlistMap;
      portfolioMap = old.portfolioMap;
      tradeOrderMap = old.tradeOrderMap;
      alertMap;
    };
  };
};
