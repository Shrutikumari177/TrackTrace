/* checksum : 2ef18470a895666e201949f54d9d664b */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZAPI_PRODUCTION_ORDERS {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZAPI_PRODUCTION_ORDERS.FunctionMessageSet {
  @sap.unicode : 'false'
  @sap.label : 'Message text'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Message : String(220) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.pageable : 'false'
@sap.addressable : 'false'
@sap.content.version : '1'
entity ZAPI_PRODUCTION_ORDERS.ReleaseMessageSet {
  @sap.unicode : 'false'
  @sap.label : 'Message text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Message : String(220) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Order'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionOrder {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  key ProductionOrder : String(12) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Plant'
  @sap.quickinfo : 'Production Plant in Planned Order'
  ProductionPlant : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Internal ID'
  OrderInternalBillOfOperations : String(10);
  OrderIsCreated : String(1);
  OrderIsReleased : String(1);
  OrderIsPrinted : String(1);
  OrderIsConfirmed : String(1);
  OrderIsPartiallyConfirmed : String(1);
  OrderIsDelivered : String(1);
  OrderIsDeleted : String(1);
  OrderIsPreCosted : String(1);
  SettlementRuleIsCreated : String(1);
  OrderIsPartiallyReleased : String(1);
  OrderIsLocked : String(1);
  OrderIsTechnicallyCompleted : String(1);
  OrderIsClosed : String(1);
  OrderIsPartiallyDelivered : String(1);
  OrderIsMarkedForDeletion : String(1);
  SettlementRuleIsCrtedManually : String(1);
  OrderIsScheduled : String(1);
  OrderHasGeneratedOperations : String(1);
  OrderIsToBeHandledInBatches : String(1);
  MaterialAvailyIsNotChecked : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number for Order'
  Material : String(40);
  @sap.label : 'Material description'
  MaterialName : String(40);
  @sap.label : 'Production Unit'
  @sap.quickinfo : 'Production Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  ProductionUnit : String(3);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Total Quantity'
  @sap.quickinfo : 'Manufacturing Order Planned Total Quantity'
  TotalQuantity : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  ManufacturingOrderType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'MRP Area'
  MRPArea : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Object Number'
  @sap.quickinfo : 'Object Internal ID'
  ManufacturingObject : String(22);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planning Plant'
  @sap.quickinfo : 'Planning Plant for an Order'
  Plant : String(4);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Confirmed Yield'
  @sap.quickinfo : 'Confirmed Yield Quantity From Order Confirmation'
  MfgOrderConfirmedYieldQty : Decimal(13, 3);
  @sap.display.format : 'Date'
  @sap.label : 'Planned Start Date'
  @sap.quickinfo : 'Manufacturing Order Planned Start Date'
  MfgOrderPlannedStartDate : Date;
  @sap.label : 'Planned Start Time'
  @sap.quickinfo : 'Manufacturing Order Planned Start Time'
  MfgOrderPlannedStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Planned End Date'
  @sap.quickinfo : 'Manufacturing Order Planned End Date'
  MfgOrderPlannedEndDate : Date;
  @sap.label : 'Planned End Time'
  @sap.quickinfo : 'Manufacturing Order Planned End Time'
  MfgOrderPlannedEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled Start Date'
  @sap.quickinfo : 'Manufacturing Order Scheduled Start Date'
  MfgOrderScheduledStartDate : Date;
  @sap.label : 'Scheduled Start Time'
  @sap.quickinfo : 'Manufacturing Order Scheduled Start Time'
  MfgOrderScheduledStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled End Date'
  @sap.quickinfo : 'Manufacturing Order Scheduled End Date'
  MfgOrderScheduledEndDate : Date;
  @sap.label : 'Scheduled End Time'
  @sap.quickinfo : 'Manufacturing Order Scheduled End Time'
  MfgOrderScheduledEndTime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Order'
  SalesOrder : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Order Item'
  SalesOrderItem : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planned Order'
  PlannedOrder : String(10);
  @sap.label : 'Name of Customer'
  CustomerName : String(80);
  @sap.display.format : 'UpperCase'
  @sap.label : 'WBS Element'
  WBSElement : String(24);
  @sap.display.format : 'NonNegative'
  @sap.label : 'WBS Element Internal'
  @sap.quickinfo : 'Work Breakdown Structure Element Internal ID'
  WBSElementInternalID : String(24);
  @sap.label : 'WBS Element Name'
  WBSDescription : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Company Code'
  CompanyCode : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Functional Area'
  FunctionalArea : String(16);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plnd Costing Variant'
  @sap.quickinfo : 'Costing Variant for Planned Costs'
  PlannedCostsCostingVariant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Act. Costing Variant'
  @sap.quickinfo : 'Costing Variant For Actual Costs'
  ActualCostsCostingVariant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Recipient'
  @sap.quickinfo : 'Object ID for recipient'
  UserID : String(70);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Version'
  ProductionVersion : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'MRP Controller'
  MRPController : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Supervisor'
  ProductionSupervisor : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Business Area'
  BusinessArea : String(4);
  @sap.label : 'Scrap Quantity'
  @sap.quickinfo : 'Manufacturing Order Planned Scrap Quantity'
  MfgOrderPlannedScrapQty : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Profit Center'
  ProfitCenter : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Importance'
  @sap.quickinfo : 'Order Importance Code'
  ManufacturingOrderImportance : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sequence Number'
  @sap.quickinfo : 'Sequence Number Order'
  OrderSequenceNumber : String(14);
  @sap.display.format : 'Date'
  @sap.label : 'Order Creation Date'
  MfgOrderCreationDate : Date;
  @sap.label : 'Order Creation Time'
  MfgOrderCreationTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Actual Release Date'
  @sap.quickinfo : 'Manufacturing Order Actual Release Date'
  MfgOrderActualReleaseDate : Date;
  @sap.label : 'Goods Recipient'
  GoodsRecipientName : String(12);
  @sap.label : 'GR Processing Time'
  @sap.quickinfo : 'Goods Receipt Processing Duration in Days'
  MaterialGoodsReceiptDuration : Decimal(3, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inventory Usability'
  @sap.quickinfo : 'Inventory Usability Code'
  InventoryUsabilityCode : String(1);
  @sap.label : 'Unloading Point'
  UnloadingPointName : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distribution Key'
  @sap.quickinfo : 'MRP Distribution Key'
  QuantityDistributionKey : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Stock Segment'
  StockSegment : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  LastChangeDateTime : String(14);
  to_ProductionOrderComponent : Association to many ZAPI_PRODUCTION_ORDERS.A_ProductionOrderComponent {  };
  to_ProductionOrderItem : Association to many ZAPI_PRODUCTION_ORDERS.A_ProductionOrderItem {  };
  to_ProductionOrderOperation : Association to many ZAPI_PRODUCTION_ORDERS.A_ProductionOrderOperation {  };
  to_ProductionOrderStatus : Association to many ZAPI_PRODUCTION_ORDERS.A_ProductionOrderStatus {  };
  to_ProductionRsceTools : Association to many ZAPI_PRODUCTION_ORDERS.A_ProductionRsceTools {  };
} actions {
  action CompleteTechnicallyProdnOrd() returns ZAPI_PRODUCTION_ORDERS.FunctionMessageSet;
  action CloseProdnOrd() returns ZAPI_PRODUCTION_ORDERS.FunctionMessageSet;
  action SetDeltnFlagProdnOrd() returns ZAPI_PRODUCTION_ORDERS.FunctionMessageSet;
  action SetDeltnIndProdnOrd() returns ZAPI_PRODUCTION_ORDERS.FunctionMessageSet;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Order Components'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionOrderComponent {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reservation'
  @sap.quickinfo : 'Number of reservation/dependent requirements'
  key Reservation : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reservation Item'
  key ReservationItem : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'BOM Item'
  @sap.quickinfo : 'BOM item number'
  BillOfMaterialItemNumber : String(4);
  @sap.label : 'BOM Item Text'
  @sap.quickinfo : 'BOM Item Text (Line 1)'
  BOMItemDescription : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Plant'
  @sap.quickinfo : 'Production Plant in Planned Order'
  ProductionPlant : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Requirement Date'
  @sap.quickinfo : 'Material Component Requirement Date'
  MatlCompRequirementDate : Date;
  @sap.label : 'Unit'
  @sap.quickinfo : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  BaseUnit : String(3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Requirement Quantity'
  RequiredQuantity : Decimal(13, 3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Withdrawn Quantity'
  WithdrawnQuantity : Decimal(13, 3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'BOM Item'
  @sap.quickinfo : 'Bill of Material Item'
  BOMItem : String(8);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Supply Area'
  SupplyArea : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sequence'
  ManufacturingOrderSequence : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  ManufacturingOrder : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Operation'
  @sap.quickinfo : 'Manufacturing Order Operation'
  ManufacturingOrderOperation : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  @sap.quickinfo : 'Manufacturing Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  ManufacturingOrderType : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Internal ID'
  OrderInternalBillOfOperations : String(10);
  @sap.label : 'Item Text 2'
  @sap.quickinfo : 'BOM Item Text (Line 2)'
  BOMItemText2 : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'BOM Item Category'
  @sap.quickinfo : 'Bill of Material Item Category'
  BOMItemCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'BOM Category'
  @sap.quickinfo : 'Bill of Material Category Code'
  BillOfMaterialCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sort String'
  SortField : String(10);
  @sap.label : 'Goods Recipient'
  GoodsRecipientName : String(12);
  @sap.label : 'Unloading Point'
  UnloadingPointName : String(25);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Order Items'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionOrderItem {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturing Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  key ManufacturingOrder : String(12) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Manufacturing Order Item'
  @sap.quickinfo : 'Manufacturing Order Item ID'
  key ManufacturingOrderItem : String(4) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  @sap.quickinfo : 'Manufacturing Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  ManufacturingOrderType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Plant'
  @sap.quickinfo : 'Production Plant in Planned Order'
  ProductionPlant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number for Order'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planning Plant'
  @sap.quickinfo : 'Planning Plant for an Order'
  MRPPlant : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Actual Delivery Date'
  @sap.quickinfo : 'Actual Delivery/Finish Date'
  MfgOrderItemActualDeliveryDate : Date;
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Total Quantity'
  @sap.quickinfo : 'Order Item Planned Total Quantity'
  MfgOrderItemPlannedTotalQty : Decimal(13, 3);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Planned Scrap'
  @sap.quickinfo : 'Order Item Planned Scrap Quantity'
  MfgOrderItemPlannedScrapQty : Decimal(13, 3);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Goods Receipt Quantity'
  @sap.quickinfo : 'Quantity of Goods Received for the Order Item'
  MfgOrderItemGoodsReceiptQty : Decimal(13, 3);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Expected Deviation'
  @sap.quickinfo : 'Expected Surplus/Deficit For Goods Receipt'
  MfgOrderItemActualDeviationQty : Decimal(13, 3);
  @sap.label : 'Production Unit'
  @sap.quickinfo : 'Production Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  ProductionUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'MRP Area'
  MRPArea : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.display.format : 'Date'
  @sap.label : 'Planned Delivery'
  @sap.quickinfo : 'Delivery Date From Planned Order'
  MfgOrderItemPlndDeliveryDate : Date;
  @sap.label : 'Goods Recipient'
  GoodsRecipientName : String(12);
  @sap.label : 'GR Processing Time'
  @sap.quickinfo : 'Goods Receipt Processing Duration in Days'
  MaterialGoodsReceiptDuration : Decimal(3, 0);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inventory Usability'
  @sap.quickinfo : 'Inventory Usability Code'
  InventoryUsabilityCode : String(1);
  @sap.label : 'Unloading Point'
  UnloadingPointName : String(25);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Distribution Key'
  @sap.quickinfo : 'MRP Distribution Key'
  QuantityDistributionKey : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Stock Segment'
  StockSegment : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Order Operations'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionOrderOperation {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Internal ID'
  key OrderInternalBillOfOperations : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Operation Internal ID'
  @sap.quickinfo : 'Internal Identifier of an Operation or Activity'
  key OrderIntBillOfOperationsItem : String(8) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturing Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  ManufacturingOrder : String(12);
  @sap.display.format : 'UpperCase'
  @sap.text : 'MfgOrderOperationText'
  @sap.label : 'Operation'
  @sap.quickinfo : 'Manufacturing Order Operation'
  ManufacturingOrderOperation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Indicator: Phase'
  MfgOrderOperationIsPhase : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sequence'
  @sap.quickinfo : 'Manufacturing Order Sequence'
  ManufacturingOrderSequence : String(6);
  @sap.label : 'Sequence Text'
  @sap.quickinfo : 'Manufacturing Order Sequence Text'
  MfgOrderSequenceText : String(40);
  @sap.label : 'Operation Text'
  @sap.quickinfo : 'Manufacturing Order Operation Text'
  MfgOrderOperationText : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  ManufacturingOrderType : String(4);
  @sap.label : 'Process Unit'
  @sap.quickinfo : 'Unit of Measure for Business Process Quantity'
  @sap.semantics : 'unit-of-measure'
  BusinessProcessEntryUnit : String(3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  @sap.quickinfo : 'Manufacturing Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.label : 'Work Center Type Code'
  WorkCenterTypeCode : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Work Center'
  WorkCenter : String(8);
  @sap.display.format : 'Date'
  @sap.label : 'Earliest Execution Start Date'
  @sap.quickinfo : 'Earliest Scheduled Execution Start Date'
  OpErlstSchedldExecStrtDte : Date;
  @sap.label : 'Earliest Execution Start Time'
  @sap.quickinfo : 'Earliest Scheduled Execution Start Time'
  OpErlstSchedldExecStrtTme : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Earliest Execution End Date'
  @sap.quickinfo : 'Earliest Scheduled Execution End Date'
  OpErlstSchedldExecEndDte : Date;
  @sap.label : 'Earliest Execution End Time'
  @sap.quickinfo : 'Earliest Scheduled Execution End Time'
  OpErlstSchedldExecEndTme : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Actual Execution Start Date'
  OpActualExecutionStartDate : Date;
  @sap.label : 'Actual Execution Start Time'
  OpActualExecutionStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Actual Execution End Date'
  OpActualExecutionEndDate : Date;
  @sap.label : 'Actual Execution End Time'
  OpActualExecutionEndTime : Time;
  @sap.label : 'Operation Unit'
  @sap.quickinfo : 'Operation Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  OperationUnit : String(3);
  @sap.unit : 'OperationUnit'
  @sap.label : 'Operation Quantity'
  @sap.quickinfo : 'Operation Total Quantity'
  OpPlannedTotalQuantity : Decimal(13, 3);
  @sap.label : 'Scheduled Execution Duration'
  @sap.quickinfo : 'Earliest Scheduled Execution Duration in Workdays'
  ErlstSchedldExecDurnInWorkdays : Integer;
  @sap.label : 'Actual Execution Duration'
  @sap.quickinfo : 'Actual Execution Duration in Workdays'
  OpActualExecutionDays : Integer;
  @sap.unit : 'OperationUnit'
  @sap.label : 'Confirmed Yield'
  @sap.quickinfo : 'Total Confirmed Yield'
  OpTotalConfirmedYieldQty : Decimal(13, 3);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Work Center Internal'
  @sap.quickinfo : 'Work Center Internal ID'
  WorkCenterInternalID : String(8);
  LastChangeDateTime : String(14);
} actions {
  action ScheduleProductionOrderOperation(
    ProductionOrder : String(12) not null,
    @odata.Type : 'Edm.DateTime'
    OpSchedldStartDate : DateTime,
    OpSchedldStartTime : Time,
    @odata.Type : 'Edm.DateTime'
    OpSchedldEndDate : DateTime,
    OpSchedldEndTime : Time,
    OpSchedulingMode : String(1) not null,
    OpSchedulingStatus : String(4),
    OpSchedulingStrategy : String(4) not null
  ) returns ZAPI_PRODUCTION_ORDERS.SchedldProdOrdOpMessage;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Order Status'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionOrderStatus {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  key ManufacturingOrder : String(12) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Status'
  @sap.quickinfo : 'Object status'
  key StatusCode : String(5) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Is User Status'
  IsUserStatus : Boolean;
  @sap.label : 'Status'
  @sap.quickinfo : 'Individual status of an object (short form)'
  StatusShortName : String(4);
  @sap.label : 'Status'
  @sap.quickinfo : 'Object status'
  StatusName : String(30);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Production Resource/Tools'
entity ZAPI_PRODUCTION_ORDERS.A_ProductionRsceTools {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Operation Task List No.'
  @sap.quickinfo : 'Order Internal ID'
  key OrderInternalBillOfOperations : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'PRT Item Counter'
  @sap.quickinfo : 'Item Counter for Production Resources/Tools'
  key MfgOrderOpProdnRsceToolIntID : String(8) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturing Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  ManufacturingOrder : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'PRT Category'
  @sap.quickinfo : 'Production Resources/Tools Category'
  ProdnRsceToolCategory : String(1);
  @sap.label : 'PRT Category Name'
  @sap.quickinfo : 'Language-dependent description of the PRT category'
  ProdnRsceToolCategoryName : String(40);
  @sap.label : 'PRT Planned Quantity Unit'
  @sap.quickinfo : 'Unit for Total Planned Quantity of Production Resource/Tool'
  @sap.semantics : 'unit-of-measure'
  PlannedProdnRsceToolQtyUnit : String(3);
  @sap.unit : 'PlannedProdnRsceToolQtyUnit'
  @sap.label : 'Planned Quantity'
  @sap.quickinfo : 'Total Planned Quantity of Production Resource/Tool'
  PlannedTotalProdnRsceToolQty : Decimal(9, 3);
  @sap.label : 'PRT Actual Quantity Unit'
  @sap.quickinfo : 'Unit for Actual Quantity of Production Resource/Tool'
  @sap.semantics : 'unit-of-measure'
  ConfirmedProdnRsceToolQtyUnit : String(3);
  @sap.unit : 'ConfirmedProdnRsceToolQtyUnit'
  @sap.label : 'Actual Quantity'
  @sap.quickinfo : 'Actual Quantity of Production Resource/Tool'
  ConfirmedProdnRsceToolQty : Decimal(9, 3);
  @sap.label : 'Usage Value Unit'
  @sap.quickinfo : 'Usage Value Unit of the Production Resource/Tool'
  @sap.semantics : 'unit-of-measure'
  ProdnRsceToolUsageQuantityUnit : String(3);
  @sap.unit : 'ProdnRsceToolUsageQuantityUnit'
  @sap.label : 'Standard Usage Value'
  @sap.quickinfo : 'Standard Usage Value for Production Resources/Tools'
  ProdnRsceToolUsageQuantity : Decimal(9, 3);
  @sap.display.format : 'Date'
  @sap.label : 'Earliest Start Date'
  @sap.quickinfo : 'Earliest Scheduled Start Date for PRT Usage'
  EarliestSchedldUsageStartDate : Date;
  @sap.label : 'Earliest Start Time'
  @sap.quickinfo : 'Earliest Scheduled Start Time for PRT Usage'
  EarliestSchedldUsageStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Earliest End Date'
  @sap.quickinfo : 'Earliest Scheduled End Date of PRT Usage'
  EarliestSchedldUsageEndDate : Date;
  @sap.label : 'Earliest End Time'
  @sap.quickinfo : 'Earliest Scheduled End Time of PRT Usage'
  EarliestSchedldUsageEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Latest Start Date'
  @sap.quickinfo : 'Latest Scheduled Start Date for PRT Usage'
  LatestSchedldUsageStartDate : Date;
  @sap.label : 'Latest Start Time'
  @sap.quickinfo : 'Latest Scheduled Start Time for PRT Usage'
  LatestSchedldUsageStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Latest End Date'
  @sap.quickinfo : 'Latest Scheduled End Date for PRT Usage'
  LatestSchedldUsageEndDate : Date;
  @sap.label : 'Latest End Time'
  @sap.quickinfo : 'Latest Scheduled End Time for PRT Usage'
  LatestSchedldUsageEndTime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  ManufacturingOrderType : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  @sap.quickinfo : 'Manufacturing Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Plant'
  @sap.quickinfo : 'Production Plant in Planned Order'
  ProductionPlant : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.label : 'API Planned Order'
@sap.content.version : '1'
entity ZAPI_PRODUCTION_ORDERS.A_PlannedOrderType {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planned Order'
  key PlannedOrder : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planned Order Type'
  PlannedOrderType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Planning material'
  Material : String(40);
  @sap.label : 'Material description'
  MaterialName : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Plant'
  @sap.quickinfo : 'Production Plant in Planned Order'
  ProductionPlant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Planning Plant'
  MRPPlant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'MRP Area'
  MRPArea : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Version'
  ProductionVersion : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Procurement Category'
  @sap.quickinfo : 'Material Procurement Category'
  MaterialProcurementCategory : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Procurement Type'
  @sap.quickinfo : 'Material Procurement Type'
  MaterialProcurementType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.label : 'Base Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  BaseUnit : String(3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Total Order Quantity'
  @sap.quickinfo : 'Planned Total Order Quantity'
  TotalQuantity : Decimal(13, 3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Scrap Quantity'
  @sap.quickinfo : 'Planned Scrap Quantity'
  PlndOrderPlannedScrapQty : Decimal(13, 3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Quantity Received'
  @sap.quickinfo : 'Quantity of Goods Received'
  GoodsReceiptQty : Decimal(13, 3);
  @sap.unit : 'BaseUnit'
  @sap.label : 'Issued Quantity'
  IssuedQuantity : Decimal(13, 3);
  @sap.display.format : 'Date'
  @sap.label : 'Order Start Date'
  @sap.quickinfo : 'Planned Order Start Date'
  PlndOrderPlannedStartDate : Date;
  @sap.label : 'Order Start Time'
  @sap.quickinfo : 'Planned Order Start Time'
  PlndOrderPlannedStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Order End Date'
  @sap.quickinfo : 'Planned Order End Date'
  PlndOrderPlannedEndDate : Date;
  @sap.label : 'Order End Time'
  @sap.quickinfo : 'Planned Order End Time'
  PlndOrderPlannedEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Order Opening Date'
  @sap.quickinfo : 'Planned Opening Date in Planned Order'
  PlannedOrderOpeningDate : Date;
  @odata.Type : 'Edm.DateTimeOffset'
  @sap.label : 'Change Time Stamp'
  @sap.quickinfo : 'Last Change to Planned Order: Time Stamp'
  LastChangeDateTime : DateTime;
  @sap.display.format : 'Date'
  @sap.label : 'Production Start Date'
  @sap.quickinfo : 'Start Date for Production'
  ProductionStartDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Production End Date'
  @sap.quickinfo : 'End Date for Production'
  ProductionEndDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Order'
  SalesOrder : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Order Item'
  SalesOrderItem : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Customer Number'
  Customer : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'WBS Element Internal'
  @sap.quickinfo : 'Work Breakdown Structure Element Internal ID'
  WBSElementInternalID : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'WBS Element'
  WBSElement : String(24);
  @sap.label : 'WBS Element Name'
  WBSDescription : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Account Assignment Category'
  AccountAssignmentCategory : String(1);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reservation'
  @sap.quickinfo : 'Number of reservation/dependent requirements'
  Reservation : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'MRP Controller'
  MRPController : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Production Supervisor'
  ProductionSupervisor : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchasing Group'
  PurchasingGroup : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purch. organization'
  @sap.quickinfo : 'Purchasing organization'
  PurchasingOrganization : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Fixed vendor'
  FixedSupplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Purchase Agreement'
  @sap.quickinfo : 'Purchase Schedule/Outline Agreement'
  PurchasingDocument : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Agreement Item'
  @sap.quickinfo : 'Purchase Schedule/Outline Agreement Item'
  PurchasingDocumentItem : String(5);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Quota Arrangement'
  QuotaArrangement : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Quota Arrangement Item'
  QuotaArrangementItem : String(3);
  @sap.label : 'Name of Supplier'
  SupplierName : String(80);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Firming Indicator'
  @sap.quickinfo : 'Firming Indicator for Planned Order Data'
  PlannedOrderIsFirm : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Conversion Indicator'
  @sap.quickinfo : 'Planned Order Conversion Indicator'
  PlannedOrderIsConvertible : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'BOM Fixing Indicator'
  @sap.quickinfo : 'Fixing Indicator for BOM Explosion'
  PlannedOrderBOMIsFixed : Boolean;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Capacity Requirement'
  @sap.quickinfo : 'ID of the Capacity Requirements Record'
  CapacityRequirement : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Capacity Requirement Origin'
  CapacityRequirementOrigin : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Task List Type'
  BillOfOperationsType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Group'
  @sap.quickinfo : 'Key for Task List Group'
  BillOfOperationsGroup : String(8);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Group Counter'
  BillOfOperations : String(2);
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled on'
  @sap.quickinfo : 'Date of the Last Scheduling'
  LastScheduledDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled finish'
  ScheduledBasicEndDate : Date;
  @sap.label : 'Earliest finish'
  @sap.quickinfo : 'Earliest finish of operation (time)'
  ScheduledBasicEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Scheduled start'
  ScheduledBasicStartDate : Date;
  @sap.label : 'Earliest start time'
  @sap.quickinfo : 'Earliest scheduled start: Execution (time)'
  ScheduledBasicStartTime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Scheduling Type'
  SchedulingType : String(1);
} actions {
  action ConvertPlannedOrder(
    ManufacturingOrderType : String(4),
    ManufacturingOrder : String(12)
  ) returns ZAPI_PRODUCTION_ORDERS.A_ProductionOrder;
};

@cds.external : true
type ZAPI_PRODUCTION_ORDERS.SchedldProdOrdOpMessage {
  @sap.label : 'Order'
  ProductionOrder : String(12) not null;
  OrderInternalBillOfOperations : LargeString not null;
  OrderIntBillOfOperationsItem : LargeString not null;
  @sap.label : 'Activity'
  ManufacturingOrderOperation : String(4) not null;
  Message : LargeString;
};

@cds.external : true
action ZAPI_PRODUCTION_ORDERS.ReleaseProductionOrder(
  ManufacturingOrder : LargeString
) returns ZAPI_PRODUCTION_ORDERS.ReleaseMessageSet;

@cds.external : true
action ZAPI_PRODUCTION_ORDERS.ReleaseProductionOrderOpr(
  ManufacturingOrder : LargeString,
  ManufacturingOrderOperation : LargeString
) returns ZAPI_PRODUCTION_ORDERS.ReleaseMessageSet;

