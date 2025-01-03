namespace track;
using {managed,cuid} from '@sap/cds/common';


entity MaterialBox {
   
  key SerialNo:   String;
  key BoxQRCode: String(255);
  BoxID          : String ;
  BoxQRCodeURL      : String(255);
  BatchID           : String(50);
  IC                : Association to InnerContainer; 
}
entity InnerContainer {
   key ICID         : String;
   ICQRCodeURL      : String(255); 
   BatchID          : String(50);
   ICQRCode         : String;
   Boxes            : Composition of many MaterialBox on Boxes.IC = $self; 
   OC               : Association to OuterContainer;  
}

entity OuterContainer {
  key OCID           : String ;
    OCQRCodeURL        : String(255); 
    BatchID          : String(50);
    OCQRCode:String;
   status :String;
    ICs                : Composition of many InnerContainer on ICs.OC = $self; 
}


