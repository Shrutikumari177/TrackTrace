/* checksum : 9e133eb148494e8b73cd3adbe9dcd191 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZAPI_PROD_ORDER_CONFIRMATION_2_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Prodn Ord Confirmation Material Document Item Assgmt'
entity ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConfMatlDocItm {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Confirmation Group'
  @sap.quickinfo : 'Collective ID of Order Confirmations'
  key ConfirmationGroup : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Confirmation'
  @sap.quickinfo : 'Identifier of Single Order Confirmation'
  key ConfirmationCount : String(8) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material Document'
  @sap.quickinfo : 'Number of Material Document'
  key MaterialDocument : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Material Doc.Item'
  @sap.quickinfo : 'Item in Material Document'
  key MaterialDocumentItem : String(4) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Material Doc. Year'
  @sap.quickinfo : 'Material Document Year'
  key MaterialDocumentYear : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  OrderType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturing Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  OrderID : String(12);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Item'
  OrderItem : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Category'
  @sap.quickinfo : 'Manufacturing Order Category'
  ManufacturingOrderCategory : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number for Order'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reservation'
  @sap.quickinfo : 'Number of reservation/dependent requirements'
  Reservation : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Reservation Item'
  @sap.quickinfo : 'Item Number of Reservation / Dependent Requirements'
  ReservationItem : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Location'
  StorageLocation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Batch'
  @sap.quickinfo : 'Batch Number'
  Batch : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Valuation Type'
  @sap.quickinfo : 'Inventory Valuation Type'
  InventoryValuationType : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Goods Movement Type'
  GoodsMovementType : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reference Doc. Type'
  @sap.quickinfo : 'Goods movement ref doc type'
  GoodsMovementRefDocType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Inventory Usability'
  @sap.quickinfo : 'Inventory Usability Code'
  InventoryUsabilityCode : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Special Stock Type'
  @sap.quickinfo : 'Inventory Special Stock Type'
  InventorySpecialStockType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sales Order'
  SalesOrder : String(10);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Sales Order Item'
  SalesOrderItem : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'WBS Element'
  @sap.quickinfo : 'Work Breakdown Structure Element (WBS Element) Edited'
  WBSElementExternalID : String(24);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Vendor'
  @sap.quickinfo : 'Vendor''s account number'
  Supplier : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Customer'
  @sap.quickinfo : 'Account number of customer'
  Customer : String(10);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Res Final Issue'
  @sap.quickinfo : 'Final Issue for Reservation'
  ReservationIsFinallyIssued : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Delivery Completed'
  @sap.quickinfo : '&quot;Delivery Completed&quot; Indicator'
  IsCompletelyDelivered : Boolean;
  @sap.display.format : 'Date'
  @sap.label : 'SLED/BBD'
  @sap.quickinfo : 'Shelf Life Expiration or Best-Before Date'
  ShelfLifeExpirationDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Date of Manufacture'
  ManufactureDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Type'
  StorageType : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Storage Bin'
  StorageBin : String(10);
  @sap.label : 'Text'
  @sap.quickinfo : 'Item Text'
  MaterialDocumentItemText : String(50);
  @sap.label : 'Unit of Entry'
  @sap.quickinfo : 'Unit of entry'
  @sap.semantics : 'unit-of-measure'
  EntryUnit : String(3);
  @sap.unit : 'EntryUnit'
  @sap.label : 'Quantity in Unit of Entry'
  QuantityInEntryUnit : Decimal(13, 3);
};

@cds.external : true
@cds.persistence.skip : true
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'API Prodn Order Confirmation 2'
entity ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConf2 {
  @sap.display.format : 'NonNegative'
  @sap.label : 'Confirmation Group'
  @sap.quickinfo : 'Collective ID of Order Confirmations'
  key ConfirmationGroup : String(10) not null;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Order Confirmation'
  @sap.quickinfo : 'Identifier of Single Order Confirmation'
  key ConfirmationCount : String(8) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Manufacturing Order'
  @sap.quickinfo : 'Manufacturing Order ID'
  OrderID : String(12);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Sequence'
  @sap.quickinfo : 'Manufacturing Order Sequence'
  Sequence : String(6);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Operation'
  @sap.quickinfo : 'Manufacturing Order Operation'
  OrderOperation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Suboperation'
  @sap.quickinfo : 'Manufacturing Order Suboperation'
  OrderSuboperation : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  @sap.quickinfo : 'Manufacturing Order Type'
  OrderType : String(4);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Operation Internal ID'
  @sap.quickinfo : 'Internal Identifier of an Operation or Activity'
  OrderOperationInternalID : String(8);
  @sap.label : 'Confirmation Text'
  ConfirmationText : String(40);
  @sap.label : 'Language Key'
  Language : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number for Order'
  Material : String(40);
  @sap.unit : 'ProductionUnit'
  @sap.label : 'Total Quantity'
  @sap.quickinfo : 'Manufacturing Order Planned Total Quantity'
  OrderPlannedTotalQty : Decimal(13, 3);
  @sap.label : 'Production Unit'
  @sap.quickinfo : 'Production Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  ProductionUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Final Confirmation Type'
  FinalConfirmationType : String(1);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Final Confirmation'
  @sap.quickinfo : 'Activation of Final Confirmation'
  IsFinalConfirmation : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Clear Open Reservs.'
  @sap.quickinfo : 'Clear Open Reservations'
  OpenReservationsIsCleared : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Reversed'
  @sap.quickinfo : 'Indicator: Document was reversed'
  IsReversed : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Is a Cancellation'
  @sap.quickinfo : 'Confirmation record is a Cancellation'
  IsReversal : Boolean;
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Goods Movement'
  @sap.quickinfo : 'Confirmation: No Goods Movement via API'
  APIConfHasNoGoodsMovements : Boolean;
  @sap.display.format : 'Date'
  @sap.label : 'Entry Date'
  @sap.quickinfo : 'Entry Date of Confirmation'
  ConfirmationEntryDate : Date;
  @sap.label : 'Entry Time'
  @sap.quickinfo : 'Confirmation Entry Time'
  ConfirmationEntryTime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Entered by User'
  @sap.quickinfo : 'User who Entered the Confirmation'
  EnteredByUser : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Last Change'
  @sap.quickinfo : 'Date of Last Change'
  LastChangeDate : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Changed by'
  @sap.quickinfo : 'Name of person who changed object'
  LastChangedByUser : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Created on'
  @sap.quickinfo : 'External date of entry for confirmation'
  ConfirmationExternalEntryDate : Date;
  @sap.label : 'Time'
  @sap.quickinfo : 'External time of entry for confirmation'
  ConfirmationExternalEntryTime : Time;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Created by'
  @sap.quickinfo : 'External creator of confirmation'
  EnteredByExternalUser : String(12);
  @sap.label : 'External Key'
  @sap.quickinfo : 'External Key for Confirmation (for example, from PDC System)'
  ExternalSystemConfirmation : UUID;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  Plant : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Object Type'
  @sap.quickinfo : 'Object types of the CIM resource'
  WorkCenterTypeCode : String(2);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Work Center'
  WorkCenter : String(8);
  @odata.Type : 'Edm.Byte'
  @sap.label : 'Split Number'
  @sap.quickinfo : 'Capacity Split Number'
  CapacityRequirementSplit : Integer;
  @sap.display.format : 'NonNegative'
  @sap.label : 'Personnel'
  @sap.quickinfo : 'Personnel Number'
  Personnel : String(8);
  @sap.display.format : 'NonNegative'
  @sap.label : 'Time Recording'
  @sap.quickinfo : 'Time Recording ID'
  TimeRecording : String(8);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Employee Wage Type'
  EmployeeWageType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Employee Wage Group'
  EmployeeWageGroup : String(3);
  @sap.label : 'Break Time Unit'
  @sap.quickinfo : 'Unit for a Break Time'
  @sap.semantics : 'unit-of-measure'
  BreakDurationUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  BreakDurationUnitISOCode : String(3);
  @sap.unit : 'BreakDurationUnit'
  @sap.label : 'Confirmed Break Time'
  ConfirmedBreakDuration : Decimal(9, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Employee Suitability'
  EmployeeSuitability : String(2);
  @sap.label : 'Number of Employees'
  NumberOfEmployees : Decimal(5, 2);
  @sap.display.format : 'Date'
  @sap.label : 'Posting Date'
  PostingDate : Date;
  @sap.display.format : 'Date'
  @sap.label : 'Start of Execution'
  @sap.quickinfo : 'Confirmed Start Date of Execution'
  ConfirmedExecutionStartDate : Date;
  @sap.label : 'Actual Start (Time)'
  @sap.quickinfo : 'Confirmed Time for ''Start Execution'''
  ConfirmedExecutionStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Finish Setup'
  @sap.quickinfo : 'Confirmed Date for ''Finish Setup'''
  ConfirmedSetupEndDate : Date;
  @sap.label : 'Finish Setup'
  @sap.quickinfo : 'Confirmed Time for ''Finish Setup'''
  ConfirmedSetupEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Start of Processing'
  @sap.quickinfo : 'Confirmed Date for ''Start Processing'''
  ConfirmedProcessingStartDate : Date;
  @sap.label : 'Start of Processing'
  @sap.quickinfo : 'Confirmed Time for ''Start Processing'''
  ConfirmedProcessingStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Finish Processing'
  @sap.quickinfo : 'Confirmed Date for ''Finish Processing&quot;'
  ConfirmedProcessingEndDate : Date;
  @sap.label : 'Finish Processing'
  @sap.quickinfo : 'Confirmed Time for ''Finish Processing'''
  ConfirmedProcessingEndTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Start of Teardown'
  @sap.quickinfo : 'Confirmed Date for ''Start Teardown'''
  ConfirmedTeardownStartDate : Date;
  @sap.label : 'Start of Teardown'
  @sap.quickinfo : 'Confirmed Time for ''Start Teardown'''
  ConfirmedTeardownStartTime : Time;
  @sap.display.format : 'Date'
  @sap.label : 'Finish Execution'
  @sap.quickinfo : 'Confirmed Finish Date of Execution'
  ConfirmedExecutionEndDate : Date;
  @sap.label : 'Actual finish (time)'
  @sap.quickinfo : 'Confirmed Time for ''Finish Execution'''
  ConfirmedExecutionEndTime : Time;
  @sap.label : 'Confirmation Unit'
  @sap.quickinfo : 'Confirmation Unit of Measure'
  @sap.semantics : 'unit-of-measure'
  ConfirmationUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  ConfirmationUnitISOCode : String(3);
  @sap.unit : 'ConfirmationUnit'
  @sap.label : 'Yield Quantity'
  @sap.quickinfo : 'Yield to be Confirmed'
  ConfirmationYieldQuantity : Decimal(13, 3);
  @sap.unit : 'ConfirmationUnit'
  @sap.label : 'Scrap Quantity'
  @sap.quickinfo : 'Scrap to Be Confirmed'
  ConfirmationScrapQuantity : Decimal(13, 3);
  @sap.unit : 'ConfirmationUnit'
  @sap.label : 'Rework Quantity'
  @sap.quickinfo : 'Current Confirmation Rework Quantity'
  ConfirmationReworkQuantity : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Variance Reason'
  @sap.quickinfo : 'Reason for Variance'
  VarianceReasonCode : String(4);
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit1 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit1ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit1'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity1 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity1IsExpd : Boolean;
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit2 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit2ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit2'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity2 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity2IsExpd : Boolean;
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit3 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit3ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit3'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity3 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity3IsExpd : Boolean;
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit4 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit4ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit4'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity4 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity4IsExpd : Boolean;
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit5 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit5ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit5'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity5 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity5IsExpd : Boolean;
  @sap.label : 'Activity Unit of Measure'
  @sap.quickinfo : 'Unit of Measure for the Activity in Confirmation'
  @sap.semantics : 'unit-of-measure'
  OpWorkQuantityUnit6 : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  WorkQuantityUnit6ISOCode : String(3);
  @sap.unit : 'OpWorkQuantityUnit6'
  @sap.label : 'Act. t/b Confirmed'
  @sap.quickinfo : 'Activity Currently to be Confirmed'
  OpConfirmedWorkQuantity6 : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'Indicator: No Remaining Activity Expected'
  NoFurtherOpWorkQuantity6IsExpd : Boolean;
  @sap.label : 'Process Unit'
  @sap.quickinfo : 'Unit of Measure for Business Process Quantity'
  @sap.semantics : 'unit-of-measure'
  BusinessProcessEntryUnit : String(3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'ISO code'
  @sap.quickinfo : 'ISO code for unit of measurement'
  BusProcessEntrUnitISOCode : String(3);
  @sap.unit : 'BusinessProcessEntryUnit'
  @sap.label : 'Process Quantity'
  @sap.quickinfo : 'Current Quantity for Business Process'
  BusinessProcessConfirmedQty : Decimal(13, 3);
  @sap.display.format : 'UpperCase'
  @sap.label : 'No Remaining Act.'
  @sap.quickinfo : 'No Remaining Quantity Expected for Business Process'
  NoFurtherBusinessProcQtyIsExpd : Boolean;
  to_ProdnOrdConfMatlDocItm : Composition of many ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConfMatlDocItm {  };
} actions {
  action CancelProdnOrdConf(
    @odata.Type : 'Edm.DateTime'
    PostingDate : DateTime,
    ConfirmationText : String(40),
    ExternalSystemConfirmation : UUID
  ) returns ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConf2;
};

