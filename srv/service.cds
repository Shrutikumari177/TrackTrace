using {track} from '../db/Schema';
using ZTRACK_TRACE_SRV from './external/ZTRACK_TRACE_SRV.cds';
using ZPRODUCTION_ORDERS_TRACKTRACE_SRV from './external/ZPRODUCTION_ORDERS_TRACKTRACE_SRV.cds';



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


   entity A_PlannedOrder as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_PlannedOrder
    {        key PlannedOrder, PlannedOrderType, Material, MaterialName, ProductionPlant, MRPPlant, MRPArea, ProductionVersion, MaterialProcurementCategory, MaterialProcurementType, StorageLocation, BaseUnit, TotalQuantity, PlndOrderPlannedScrapQty, GoodsReceiptQty, IssuedQuantity, PlndOrderPlannedStartDate, PlndOrderPlannedStartTime, PlndOrderPlannedEndDate, PlndOrderPlannedEndTime, PlannedOrderOpeningDate, LastChangeDateTime, ProductionStartDate, ProductionEndDate, SalesOrder, SalesOrderItem, Customer, WBSElementInternalID, WBSElement, WBSDescription, AccountAssignmentCategory, Reservation, MRPController, ProductionSupervisor, PurchasingGroup, PurchasingOrganization, FixedSupplier, PurchasingDocument, PurchasingDocumentItem, QuotaArrangement, QuotaArrangementItem, SupplierName, PlannedOrderIsFirm, PlannedOrderIsConvertible, PlannedOrderBOMIsFixed, CapacityRequirement, CapacityRequirementOrigin, BillOfOperationsType, BillOfOperationsGroup, BillOfOperations, LastScheduledDate, ScheduledBasicEndDate, ScheduledBasicEndTime, ScheduledBasicStartDate, ScheduledBasicStartTime, SchedulingType     }    
;
    
    entity A_ProductionOrder as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionOrder
    {        key ProductionOrder, ProductionPlant, OrderInternalBillOfOperations, OrderIsCreated, OrderIsReleased, OrderIsPrinted, OrderIsConfirmed, OrderIsPartiallyConfirmed, OrderIsDelivered, OrderIsDeleted, OrderIsPreCosted, SettlementRuleIsCreated, OrderIsPartiallyReleased, OrderIsLocked, OrderIsTechnicallyCompleted, OrderIsClosed, OrderIsPartiallyDelivered, OrderIsMarkedForDeletion, SettlementRuleIsCrtedManually, OrderIsScheduled, OrderHasGeneratedOperations, OrderIsToBeHandledInBatches, MaterialAvailyIsNotChecked, Material, MaterialName, ProductionUnit, TotalQuantity, ManufacturingOrderType, MRPArea, ManufacturingObject, Plant, MfgOrderConfirmedYieldQty, MfgOrderPlannedStartDate, MfgOrderPlannedStartTime, MfgOrderPlannedEndDate, MfgOrderPlannedEndTime, MfgOrderScheduledStartDate, MfgOrderScheduledStartTime, MfgOrderScheduledEndDate, MfgOrderScheduledEndTime, SalesOrder, SalesOrderItem, PlannedOrder, CustomerName, WBSElement, WBSElementInternalID, WBSDescription, CompanyCode, FunctionalArea, PlannedCostsCostingVariant, ActualCostsCostingVariant, UserID, ProductionVersion, MRPController, ProductionSupervisor, ManufacturingOrderCategory, BusinessArea, MfgOrderPlannedScrapQty, ProfitCenter, ManufacturingOrderImportance, OrderSequenceNumber, MfgOrderCreationDate, MfgOrderCreationTime, MfgOrderActualReleaseDate, GoodsRecipientName, MaterialGoodsReceiptDuration, InventoryUsabilityCode, UnloadingPointName, QuantityDistributionKey, StockSegment, StorageLocation, LastChangeDateTime     }    
;
    
    entity A_ProductionOrderComponent as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionOrderComponent
    {        key Reservation, key ReservationItem, BillOfMaterialItemNumber, BOMItemDescription, Material, Plant, ProductionPlant, MatlCompRequirementDate, BaseUnit, RequiredQuantity, WithdrawnQuantity, BOMItem, StorageLocation, SupplyArea, ManufacturingOrderSequence, ManufacturingOrder, ManufacturingOrderOperation, ManufacturingOrderCategory, ManufacturingOrderType, OrderInternalBillOfOperations, BOMItemText2, BOMItemCategory, BillOfMaterialCategory, SortField, GoodsRecipientName, UnloadingPointName     }    
;
    
    entity A_ProductionOrderItem as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionOrderItem
    {        key ManufacturingOrder, key ManufacturingOrderItem, ManufacturingOrderCategory, ManufacturingOrderType, ProductionPlant, Material, MRPPlant, MfgOrderItemActualDeliveryDate, MfgOrderItemPlannedTotalQty, MfgOrderItemPlannedScrapQty, MfgOrderItemGoodsReceiptQty, MfgOrderItemActualDeviationQty, ProductionUnit, MRPArea, StorageLocation, MfgOrderItemPlndDeliveryDate, GoodsRecipientName, MaterialGoodsReceiptDuration, InventoryUsabilityCode, UnloadingPointName, QuantityDistributionKey, StockSegment     }    
;
    
    entity A_ProductionOrderOperation as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionOrderOperation
    {        key OrderInternalBillOfOperations, key OrderIntBillOfOperationsItem, ManufacturingOrder, ManufacturingOrderOperation, MfgOrderOperationIsPhase, ManufacturingOrderSequence, MfgOrderSequenceText, MfgOrderOperationText, ManufacturingOrderType, BusinessProcessEntryUnit, ManufacturingOrderCategory, WorkCenterTypeCode, WorkCenter, OpErlstSchedldExecStrtDte, OpErlstSchedldExecStrtTme, OpErlstSchedldExecEndDte, OpErlstSchedldExecEndTme, OpActualExecutionStartDate, OpActualExecutionStartTime, OpActualExecutionEndDate, OpActualExecutionEndTime, OperationUnit, OpPlannedTotalQuantity, ErlstSchedldExecDurnInWorkdays, OpActualExecutionDays, OpTotalConfirmedYieldQty, WorkCenterInternalID, LastChangeDateTime     }    
;
    
    entity A_ProductionOrderStatus as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionOrderStatus
    {        key ManufacturingOrder, key StatusCode, IsUserStatus, StatusShortName, StatusName     }    
;
    
    entity A_ProductionRsceTools as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.A_ProductionRsceTools
    {        key OrderInternalBillOfOperations, key MfgOrderOpProdnRsceToolIntID, ManufacturingOrder, ProdnRsceToolCategory, ProdnRsceToolCategoryName, PlannedProdnRsceToolQtyUnit, PlannedTotalProdnRsceToolQty, ConfirmedProdnRsceToolQtyUnit, ConfirmedProdnRsceToolQty, ProdnRsceToolUsageQuantityUnit, ProdnRsceToolUsageQuantity, EarliestSchedldUsageStartDate, EarliestSchedldUsageStartTime, EarliestSchedldUsageEndDate, EarliestSchedldUsageEndTime, LatestSchedldUsageStartDate, LatestSchedldUsageStartTime, LatestSchedldUsageEndDate, LatestSchedldUsageEndTime, ManufacturingOrderType, ManufacturingOrderCategory, ProductionPlant     }    
;
    
    entity FunctionMessageSet as projection on ZPRODUCTION_ORDERS_TRACKTRACE_SRV.FunctionMessageSet
    {        key Message     }    
;
entity zorderType_Track as projection on ZTRACK_TRACE_SRV.zorderType_Track
    {        key Plant, OrderType     }    
;
    
    entity ztrack_material as projection on ZTRACK_TRACE_SRV.ztrack_material
    {        key Material, MaterialType, MaterialDesc     }    
;
    
  
    entity MaterialBox as projection on track.MaterialBox;
    entity InnerContainer as projection on track.InnerContainer;

    entity OuterContainer as projection on track.OuterContainer;


}


