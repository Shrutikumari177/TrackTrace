namespace track;
using {managed,cuid} from '@sap/cds/common';

entity BoxLineItem{
    key ProdcuctID : String;
    productCode : String;
    QrCode : String; 
    QrCodeId : String;
    BatchId : String;
    CreationDate: DateTime; 
}


entity InnerContainer {
    key innerContainerId: String;   
    qrCode: String;                 
    creationDate: DateTime;        
    PerfumeBottles: Composition of many BoxCollection on PerfumeBottles.innerContainerId = $self;
}
entity BoxCollection {
    key productCode: String;            
    batchId: String;                
    manufacturedDate: Date;         
    qrCode: String;                 
    innerContainerId: Association to InnerContainer;
}

entity outerContainer{
     OcCode : String;
     QrCode : String;
     QrCodeId : String;
     SeqNo : String
}
entity OC_innerIC{
     IcCode : String;
     QrCode : String;
     QrCodeId : String;
     SeqNo : String
}

