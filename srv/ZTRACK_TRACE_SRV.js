const cds = require('@sap/cds');

module.exports = async (srv) => 
{        
    // Using CDS API      
    const ZTRACK_TRACE_SRV = await cds.connect.to("ZTRACK_TRACE_SRV"); 
      srv.on('READ', 'ZProductionOrder_track', req => ZTRACK_TRACE_SRV.run(req.query)); 
}