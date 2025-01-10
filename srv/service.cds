using {track} from '../db/Schema';
using ZTRACK_TRACE_SRV from './external/ZTRACK_TRACE_SRV.cds';
using ZPRODUCTION_ORDERS_TRACKTRACE_SRV from './external/ZPRODUCTION_ORDERS_TRACKTRACE_SRV.cds';
using ZAPI_PRODUCTION_ORDERS from './external/ZAPI_PRODUCTION_ORDERS.cds';
using ZAPI_PROD_ORDER_CONFIRMATION_2_SRV from './external/ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.cds';





service trackservice {

     function getBatchIDRelevantData(BatchNo : String,filterNonEmptyBoxQRCode:Boolean,filterNoEmptyICID:Boolean ) returns array of {
        BatchNo : String;
        SerialNo:String;
        Material:String;
        ManufactureDt:DateTime;
        ExpiryDt:DateTime;
        ProductionOrder:Int64;
        BoxQRCodeURL      : String;
        BoxQRCode: String;
        ICID:String;
        ICQRCode         : String;
        ICQRCodeURL      : String; 
        OCID:String;
        OCQRCode:String;
        OCQRCodeURL        : String; 
        
    };

    function getBatchOCValueHelp(BatchID : String, ) returns array of {
        OCID:String;
    };

    function getBatchOcDealerMappingdata(BatchID : String,OCID:String) returns array of{
           OCID:String;
           ProductionOrder:Int64;
           BatchID      : String(50);
           ManufactureDt:DateTime;
           ExpiryDt:DateTime;
           Qunatity :Int64;
            VendorId :  String;
            VendorName :String; 
    };

    function getProductionTrackingDashboardData( OCID: String) returns array of  {
        OCID: String;
        OCQRCode: String;
        OCQRCodeURL: String;
        BatchID: String;
        status: String;
        VendorId: String;
        VendorName: String;
        ManufactureDt: DateTime;
        ExpiryDt: DateTime;
        ProductionOrder: Int64;
        Material: String;
        ICs: array of {
            ICID: String;
            ICQRCode: String;
            ICQRCodeURL: String;
            Boxes: array of {
                SerialNo: String;
                BoxQRCode: String;
                BoxQRCodeURL: String;
            };
        };
    };

    function getDealerDashOCValueHelp(VendorId : String, ) returns array of {
        OCID:String;
    };



    
    
   
    
   entity zbatchdetails_Track as projection on ZTRACK_TRACE_SRV.zbatchdetails_Track
    {        key BatchNo, key SerialNo, Material, aufnr, ManufactureDt, ExpiryDt, ProductionOrder, OrderList     }    
;
    
    entity zbatchno_track as projection on ZTRACK_TRACE_SRV.zbatchno_track
    {        key BatchNo     }    
;
 entity A_ProductionOrder as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionOrder
    {        key ProductionOrder, ProductionPlant, OrderInternalBillOfOperations, OrderIsCreated, OrderIsReleased, OrderIsPrinted, OrderIsConfirmed, OrderIsPartiallyConfirmed, OrderIsDelivered, OrderIsDeleted, OrderIsPreCosted, SettlementRuleIsCreated, OrderIsPartiallyReleased, OrderIsLocked, OrderIsTechnicallyCompleted, OrderIsClosed, OrderIsPartiallyDelivered, OrderIsMarkedForDeletion, SettlementRuleIsCrtedManually, OrderIsScheduled, OrderHasGeneratedOperations, OrderIsToBeHandledInBatches, MaterialAvailyIsNotChecked, Material, MaterialName, ProductionUnit, TotalQuantity, ManufacturingOrderType, MRPArea, ManufacturingObject, Plant, MfgOrderConfirmedYieldQty, MfgOrderPlannedStartDate, MfgOrderPlannedStartTime, MfgOrderPlannedEndDate, MfgOrderPlannedEndTime, MfgOrderScheduledStartDate, MfgOrderScheduledStartTime, MfgOrderScheduledEndDate, MfgOrderScheduledEndTime, SalesOrder, SalesOrderItem, PlannedOrder, CustomerName, WBSElement, WBSElementInternalID, WBSDescription, CompanyCode, FunctionalArea, PlannedCostsCostingVariant, ActualCostsCostingVariant, UserID, ProductionVersion, MRPController, ProductionSupervisor, ManufacturingOrderCategory, BusinessArea, MfgOrderPlannedScrapQty, ProfitCenter, ManufacturingOrderImportance, OrderSequenceNumber, MfgOrderCreationDate, MfgOrderCreationTime, MfgOrderActualReleaseDate, GoodsRecipientName, MaterialGoodsReceiptDuration, InventoryUsabilityCode, UnloadingPointName, QuantityDistributionKey, StockSegment, StorageLocation, LastChangeDateTime     }    
;
    
    entity A_ProductionOrderComponent as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionOrderComponent
    {        key Reservation, key ReservationItem, BillOfMaterialItemNumber, BOMItemDescription, Material, Plant, ProductionPlant, MatlCompRequirementDate, BaseUnit, RequiredQuantity, WithdrawnQuantity, BOMItem, StorageLocation, SupplyArea, ManufacturingOrderSequence, ManufacturingOrder, ManufacturingOrderOperation, ManufacturingOrderCategory, ManufacturingOrderType, OrderInternalBillOfOperations, BOMItemText2, BOMItemCategory, BillOfMaterialCategory, SortField, GoodsRecipientName, UnloadingPointName     }    
;
    
    entity A_ProductionOrderItem as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionOrderItem
    {        key ManufacturingOrder, key ManufacturingOrderItem, ManufacturingOrderCategory, ManufacturingOrderType, ProductionPlant, Material, MRPPlant, MfgOrderItemActualDeliveryDate, MfgOrderItemPlannedTotalQty, MfgOrderItemPlannedScrapQty, MfgOrderItemGoodsReceiptQty, MfgOrderItemActualDeviationQty, ProductionUnit, MRPArea, StorageLocation, MfgOrderItemPlndDeliveryDate, GoodsRecipientName, MaterialGoodsReceiptDuration, InventoryUsabilityCode, UnloadingPointName, QuantityDistributionKey, StockSegment     }    
;
    
    entity A_ProductionOrderOperation as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionOrderOperation
    {        key OrderInternalBillOfOperations, key OrderIntBillOfOperationsItem, ManufacturingOrder, ManufacturingOrderOperation, MfgOrderOperationIsPhase, ManufacturingOrderSequence, MfgOrderSequenceText, MfgOrderOperationText, ManufacturingOrderType, BusinessProcessEntryUnit, ManufacturingOrderCategory, WorkCenterTypeCode, WorkCenter, OpErlstSchedldExecStrtDte, OpErlstSchedldExecStrtTme, OpErlstSchedldExecEndDte, OpErlstSchedldExecEndTme, OpActualExecutionStartDate, OpActualExecutionStartTime, OpActualExecutionEndDate, OpActualExecutionEndTime, OperationUnit, OpPlannedTotalQuantity, ErlstSchedldExecDurnInWorkdays, OpActualExecutionDays, OpTotalConfirmedYieldQty, WorkCenterInternalID, LastChangeDateTime     }    
;
    
    entity A_ProductionOrderStatus as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionOrderStatus
    {        key ManufacturingOrder, key StatusCode, IsUserStatus, StatusShortName, StatusName     }    
;
    
    entity A_ProductionRsceTools as projection on ZAPI_PRODUCTION_ORDERS.A_ProductionRsceTools
    {        key OrderInternalBillOfOperations, key MfgOrderOpProdnRsceToolIntID, ManufacturingOrder, ProdnRsceToolCategory, ProdnRsceToolCategoryName, PlannedProdnRsceToolQtyUnit, PlannedTotalProdnRsceToolQty, ConfirmedProdnRsceToolQtyUnit, ConfirmedProdnRsceToolQty, ProdnRsceToolUsageQuantityUnit, ProdnRsceToolUsageQuantity, EarliestSchedldUsageStartDate, EarliestSchedldUsageStartTime, EarliestSchedldUsageEndDate, EarliestSchedldUsageEndTime, LatestSchedldUsageStartDate, LatestSchedldUsageStartTime, LatestSchedldUsageEndDate, LatestSchedldUsageEndTime, ManufacturingOrderType, ManufacturingOrderCategory, ProductionPlant     }    
;
    
    entity FunctionMessageSet as projection on ZAPI_PRODUCTION_ORDERS.FunctionMessageSet
    {        key Message     }    
;
    
    entity ReleaseMessageSet as projection on ZAPI_PRODUCTION_ORDERS.ReleaseMessageSet
    {        key Message     }    
;


   entity A_PlannedOrder as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_PlannedOrder
    {        key PlannedOrder, PlannedOrderType, Material, MaterialName, ProductionPlant, MRPPlant, MRPArea, ProductionVersion, MaterialProcurementCategory, MaterialProcurementType, StorageLocation, BaseUnit, TotalQuantity, PlndOrderPlannedScrapQty, GoodsReceiptQty, IssuedQuantity, PlndOrderPlannedStartDate, PlndOrderPlannedStartTime, PlndOrderPlannedEndDate, PlndOrderPlannedEndTime, PlannedOrderOpeningDate, LastChangeDateTime, ProductionStartDate, ProductionEndDate, SalesOrder, SalesOrderItem, Customer, WBSElementInternalID, WBSElement, WBSDescription, AccountAssignmentCategory, Reservation, MRPController, ProductionSupervisor, PurchasingGroup, PurchasingOrganization, FixedSupplier, PurchasingDocument, PurchasingDocumentItem, QuotaArrangement, QuotaArrangementItem, SupplierName, PlannedOrderIsFirm, PlannedOrderIsConvertible, PlannedOrderBOMIsFixed, CapacityRequirement, CapacityRequirementOrigin, BillOfOperationsType, BillOfOperationsGroup, BillOfOperations, LastScheduledDate, ScheduledBasicEndDate, ScheduledBasicEndTime, ScheduledBasicStartDate, ScheduledBasicStartTime, SchedulingType     }    
;
    
   entity zorderType_Track as projection on ZTRACK_TRACE_SRV.zorderType_Track
    {        key Plant, OrderType     }    
;
    
    entity ztrack_material as projection on ZTRACK_TRACE_SRV.ztrack_material
    {        key Material, MaterialType, MaterialDesc     }    
;
entity ProdnOrdConf2 as projection on ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConf2
    {        key ConfirmationGroup, key ConfirmationCount, OrderID, Sequence, OrderOperation, OrderSuboperation, OrderType, OrderOperationInternalID, ConfirmationText, Language, Material, OrderPlannedTotalQty, ProductionUnit, FinalConfirmationType, IsFinalConfirmation, OpenReservationsIsCleared, IsReversed, IsReversal, APIConfHasNoGoodsMovements, ConfirmationEntryDate, ConfirmationEntryTime, EnteredByUser, LastChangeDate, LastChangedByUser, ConfirmationExternalEntryDate, ConfirmationExternalEntryTime, EnteredByExternalUser, ExternalSystemConfirmation, Plant, WorkCenterTypeCode, WorkCenter, CapacityRequirementSplit, Personnel, TimeRecording, EmployeeWageType, EmployeeWageGroup, BreakDurationUnit, BreakDurationUnitISOCode, ConfirmedBreakDuration, EmployeeSuitability, NumberOfEmployees, PostingDate, ConfirmedExecutionStartDate, ConfirmedExecutionStartTime, ConfirmedSetupEndDate, ConfirmedSetupEndTime, ConfirmedProcessingStartDate, ConfirmedProcessingStartTime, ConfirmedProcessingEndDate, ConfirmedProcessingEndTime, ConfirmedTeardownStartDate, ConfirmedTeardownStartTime, ConfirmedExecutionEndDate, ConfirmedExecutionEndTime, ConfirmationUnit, ConfirmationUnitISOCode, ConfirmationYieldQuantity, ConfirmationScrapQuantity, ConfirmationReworkQuantity, VarianceReasonCode, OpWorkQuantityUnit1, WorkQuantityUnit1ISOCode, OpConfirmedWorkQuantity1, NoFurtherOpWorkQuantity1IsExpd, OpWorkQuantityUnit2, WorkQuantityUnit2ISOCode, OpConfirmedWorkQuantity2, NoFurtherOpWorkQuantity2IsExpd, OpWorkQuantityUnit3, WorkQuantityUnit3ISOCode, OpConfirmedWorkQuantity3, NoFurtherOpWorkQuantity3IsExpd, OpWorkQuantityUnit4, WorkQuantityUnit4ISOCode, OpConfirmedWorkQuantity4, NoFurtherOpWorkQuantity4IsExpd, OpWorkQuantityUnit5, WorkQuantityUnit5ISOCode, OpConfirmedWorkQuantity5, NoFurtherOpWorkQuantity5IsExpd, OpWorkQuantityUnit6, WorkQuantityUnit6ISOCode, OpConfirmedWorkQuantity6, NoFurtherOpWorkQuantity6IsExpd, BusinessProcessEntryUnit, BusProcessEntrUnitISOCode, BusinessProcessConfirmedQty, NoFurtherBusinessProcQtyIsExpd     }    
;
    
    entity ProdnOrdConfMatlDocItm as projection on ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.ProdnOrdConfMatlDocItm
    {        key ConfirmationGroup, key ConfirmationCount, key MaterialDocument, key MaterialDocumentItem, key MaterialDocumentYear, OrderType, OrderID, OrderItem, ManufacturingOrderCategory, Material, Plant, Reservation, ReservationItem, StorageLocation, Batch, InventoryValuationType, GoodsMovementType, GoodsMovementRefDocType, InventoryUsabilityCode, InventorySpecialStockType, SalesOrder, SalesOrderItem, WBSElementExternalID, Supplier, Customer, ReservationIsFinallyIssued, IsCompletelyDelivered, ShelfLifeExpirationDate, ManufactureDate, StorageType, StorageBin, MaterialDocumentItemText, EntryUnit, QuantityInEntryUnit     }    
;
    
  
    entity MaterialBox as projection on track.MaterialBox;
    entity InnerContainer as projection on track.InnerContainer;

    entity OuterContainer as projection on track.OuterContainer;


}


