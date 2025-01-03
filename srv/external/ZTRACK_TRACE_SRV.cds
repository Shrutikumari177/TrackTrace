/* checksum : 15d45d75d277aa3a0c1048184afa43cd */
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

