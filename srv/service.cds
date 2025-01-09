using {track} from '../db/Schema';
using ZTRACK_TRACE_SRV from './external/ZTRACK_TRACE_SRV.cds';


service trackservice {

     function getBatchIDRelevantData(BatchNo : String,filterNonEmptyBoxQRCode:Boolean,filterNoEmptyICID:Boolean ) returns array of {
        BatchNo : String;
        SerialNo:String;
        Material:String;
        ManufactureDt:DateTime;
        ExpiryDt:DateTime;
        ProductionOrder:Int64;
        BoxQRCodeURL      : String(255);
        BoxQRCode: String;
        ICID:String;
        ICQRCode         : String;
        ICQRCodeURL      : String(255); 
        OCID:String;
        OCQRCode:String;
        OCQRCodeURL        : String(255); 
        
    };

    function getBatchOCValueHelp(BatchID : String, ) returns array of {
        OCID:String;
    };

    
    
   
    
   entity zbatchdetails_Track as projection on ZTRACK_TRACE_SRV.zbatchdetails_Track
    {        key BatchNo, key SerialNo, Material, aufnr, ManufactureDt, ExpiryDt, ProductionOrder, OrderList     }    
;
    
    entity zbatchno_track as projection on ZTRACK_TRACE_SRV.zbatchno_track
    {        key BatchNo     }    
;
    entity MaterialBox as projection on track.MaterialBox;
    entity InnerContainer as projection on track.InnerContainer;

    entity OuterContainer as projection on track.OuterContainer;


}


