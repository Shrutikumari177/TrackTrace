namespace track;

using {
  managed,
  cuid
} from '@sap/cds/common';


entity MaterialBox {

  key SerialNo     : String;
  key BoxQRCode    : String(255);
      BoxID        : String;
      BoxQRCodeURL : String;
      BatchID      : String(50);
      IC           : Association to InnerContainer;
}

entity InnerContainer {
  key ICID        : String;
  key ICQRCodeURL : String;
  key ICQRCode    : String;
      BatchID     : String(50);
      Boxes       : Composition of many MaterialBox
                      on Boxes.IC = $self;
      OC          : Association to OuterContainer;
}

entity OuterContainer {
  key OCID        : String;
  key OCQRCodeURL : String;
  key OCQRCode    : String;
      BatchID     : String(50);
      status      : String;
      ICs         : Composition of many InnerContainer
                      on ICs.OC = $self;
      VendorId :  String;
      VendorName :String;             
}
