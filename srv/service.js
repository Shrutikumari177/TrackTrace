const cds = require('@sap/cds');

module.exports = async (srv) => {
    const ZTRACK_TRACE_SRV = await cds.connect.to("ZTRACK_TRACE_SRV"); 
    srv.on('READ', 'zbatchdetails_Track', req => ZTRACK_TRACE_SRV.run(req.query)); 
    srv.on('READ', 'zbatchno_track', req => ZTRACK_TRACE_SRV.run(req.query)); 

   
    const createQRCodeURL = (data) => {
        const qrPayload = JSON.stringify(data);  // Convert the payload into a JSON string
        return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrPayload)}`;
    };
 
    srv.on('CREATE', 'MaterialBox', async (req) => {
        const { SerialNo, BatchID } = req.data;
    
     
        if (!SerialNo || !BatchID) {
            req.reject(400, "Both 'SerialNo' and 'BatchID' are required.");
        }
    
        try {
         
            const batchDetails = await fetchBatchDetails(BatchID, SerialNo);
            if (!batchDetails) {
                req.reject(404, `No details found for BatchID: ${BatchID} and SerialNo: ${SerialNo}`);
            }
    
           
            const boxId = `Box${SerialNo}`;
    
           
            const combinedData = `${SerialNo}${BatchID}${batchDetails.Material}${batchDetails.ProductionOrder}`;
    
          
    
            
            const base36String = parseInt(combinedData.substring(0, 8), 16).toString(36); // Convert first 8 hex characters to base-36
            const boxQRCode = base36String.slice(0, 10).padStart(10, '0'); // Ensure the length is 10, pad with zeros if needed
    
            const qrCodeURL = createQRCodeURL({
                SerialNo: SerialNo,
                BatchID: BatchID,
                Material: batchDetails.Material,
                ManufactureDt: batchDetails.ManufactureDt,
                ExpiryDt: batchDetails.ExpiryDt,
                ProductionOrder: batchDetails.ProductionOrder,
            });
    
            const newEntry = {
                SerialNo: SerialNo,
                BoxQRCode: boxQRCode, 
                BoxID: boxId,
                BoxQRCodeURL: qrCodeURL,
                BatchID: BatchID,
            };
    
          
            await cds.run(INSERT.into('MaterialBox').entries(newEntry));
    
          
            return newEntry;
    
        } catch (error) {
            console.error("Error creating MaterialBox:", error.message);
            req.reject(500, error.message);
        }
    });
    
    
    async function fetchBatchDetails(BatchID, SerialNo) {
        try {
            const query = SELECT.one.from('zbatchdetails_Track')
                .columns(['Material', 'ManufactureDt', 'ExpiryDt', 'ProductionOrder'])
                .where({ BatchNo: BatchID, SerialNo: SerialNo }); 
    
            const result = await ZTRACK_TRACE_SRV.run(query);
    
            return result;
        } catch (error) {
            console.error("Error fetching batch details:", error.message);
            throw new Error("Failed to fetch batch details.");
        }
    }
    
  
    
   
    srv.on('getBatchIDRelevantData', async (req) => {
        try {
            const { BatchNo } = req.data;
    
            if (!BatchNo) {
                req.reject(400, "The parameter 'BatchNo' is required.");
            }
    
            let query = SELECT.from('zbatchdetails_Track')
                .columns(['BatchNo', 'SerialNo', 'Material', 'ManufactureDt', 'ExpiryDt', 'ProductionOrder'])
                .where({ BatchNo });
    
            const result = await ZTRACK_TRACE_SRV.run(query);
    
            if (!result || result.length === 0) {
                req.reject(404, "No records found for the provided Batch ID.");
            }
    
            const SerialNos = result.map(item => item.SerialNo);
    
            const resultData = await SELECT.from('track.MaterialBox')
                .columns(['BoxQRCode', 'BoxQRCodeURL', 'SerialNo'])
                .where({
                    BatchID: BatchNo,
                    SerialNo: { in: SerialNos } 
                });
    
            const combinedResult = result.map(batchItem => {
                const matchedBoxData = resultData.filter(box => box.SerialNo === batchItem.SerialNo);
    
                if (matchedBoxData.length === 0) {
                    return {
                        BatchNo: batchItem.BatchNo,
                        SerialNo: batchItem.SerialNo,
                        Material: batchItem.Material,
                        ManufactureDt: batchItem.ManufactureDt,
                        ExpiryDt: batchItem.ExpiryDt,
                        ProductionOrder: batchItem.ProductionOrder,
                        BoxQRCode: "",
                        BoxQRCodeURL: ""
                    };
                }
    
                return matchedBoxData.map(box => ({
                    BatchNo: batchItem.BatchNo,
                    SerialNo: batchItem.SerialNo,
                    Material: batchItem.Material,
                    ManufactureDt: batchItem.ManufactureDt,
                    ExpiryDt: batchItem.ExpiryDt,
                    ProductionOrder: batchItem.ProductionOrder,
                    BoxQRCode: box.BoxQRCode,
                    BoxQRCodeURL: box.BoxQRCodeURL
                }));
            }).flat(); 
    
            return combinedResult;
    
        } catch (error) {
            console.error("Error", error);
            req.reject(500,error);
        }
    });
    
    
  
    

   
};

