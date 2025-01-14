/* checksum : c8cfcb490dbf60d0846013a6415e17f7 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.message.scope.supported : 'true'
@sap.supported.formats : 'atom json xlsx'
service ZTRACK_TRACE_SRV {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'track batch details'
entity ZTRACK_TRACE_SRV.zbatchdetails_Track {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Batch'
  @sap.quickinfo : 'Batch Number'
  key BatchNo : String(10) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Serial Number'
  key SerialNo : String(18) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  Material : String(40);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  aufnr : String(12);
  @sap.display.format : 'Date'
  @sap.label : 'Date of Manufacture'
  ManufactureDt : Date;
  @sap.display.format : 'Date'
  @sap.label : 'SLED/BBD'
  @sap.quickinfo : 'Shelf Life Expiration or Best-Before Date'
  ExpiryDt : Date;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  ProductionOrder : String(12);
  @sap.label : 'Object list'
  @sap.quickinfo : 'Object list number'
  OrderList : Integer64;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'batchno track'
entity ZTRACK_TRACE_SRV.zbatchno_track {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Batch'
  @sap.quickinfo : 'Batch Number'
  key BatchNo : String(10) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'track ordertype'
entity ZTRACK_TRACE_SRV.zorderType_Track {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Plant'
  key Plant : String(4) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order Type'
  OrderType : String(4);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'production order in Track and Trace'
entity ZTRACK_TRACE_SRV.ZProductionOrder_track {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Order'
  @sap.quickinfo : 'Order Number'
  key ProductionOrder : String(12) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '1'
@sap.label : 'material for track'
entity ZTRACK_TRACE_SRV.ztrack_material {
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material'
  @sap.quickinfo : 'Material Number'
  key Material : String(40) not null;
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material type'
  MaterialType : String(4);
  @sap.display.format : 'UpperCase'
  @sap.label : 'Material description'
  @sap.quickinfo : 'Material Description in Uppercase for Matchcodes'
  MaterialDesc : String(40);
};

