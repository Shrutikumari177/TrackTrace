const cds = require('@sap/cds');

module.exports = async (srv) => {
    const ZPRODUCTION_ORDERS_TRACKTRACE_SRV = await cds.connect.to("ZPRODUCTION_ORDERS_TRACKTRACE_SRV"); 
      srv.on('READ', 'A_PlannedOrder', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionOrder', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionOrderComponent', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionOrderItem', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionOrderOperation', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionOrderStatus', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'A_ProductionRsceTools', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 
      srv.on('READ', 'FunctionMessageSet', req => ZPRODUCTION_ORDERS_TRACKTRACE_SRV.run(req.query)); 




    const ZTRACK_TRACE_SRV = await cds.connect.to("ZTRACK_TRACE_SRV");
    srv.on('READ', 'zbatchdetails_Track', req => ZTRACK_TRACE_SRV.run(req.query));
    srv.on('READ', 'zbatchno_track', req => ZTRACK_TRACE_SRV.run(req.query));
    srv.on('READ', 'ztrack_material', req => ZTRACK_TRACE_SRV.run(req.query)); 
    srv.on('READ', 'zorderType_Track', req => ZTRACK_TRACE_SRV.run(req.query)); 


    
    srv.on('getBatchIDRelevantData', async (req) => {
        try {
            const { BatchNo, filterNonEmptyBoxQRCode ,filterNoEmptyICID} = req.data;

            if (!BatchNo) {
                req.reject(400, "The parameter 'BatchNo' is required.");
            }

            const query = SELECT.from('zbatchdetails_Track')
                .columns(['BatchNo', 'SerialNo', 'Material', 'ManufactureDt', 'ExpiryDt', 'ProductionOrder'])
                .where({ BatchNo });

            const result = await ZTRACK_TRACE_SRV.run(query);

            if (!result || result.length === 0) {
                req.reject(404, "No records found for the provided Batch ID.");
            }

            const SerialNos = result.map(item => item.SerialNo);

            const resultData = await SELECT.from('track.MaterialBox')
                .columns(['BoxQRCode', 'BoxQRCodeURL', 'SerialNo', 'IC_ICQRCode', 'IC_ICQRCodeURL', 'IC_ICID',
                    'IC.OC_OCID', 'IC.OC_OCQRCode', 'IC.OC_OCQRCodeURL']).where({
                        BatchID: BatchNo,
                        SerialNo: { in: SerialNos }
                    });

            
            
            let combinedResult = result.map(batchItem => {
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
                        BoxQRCodeURL: "",
                        ICID: "",
                        ICQRCode: "",
                        ICQRCodeURL: "",
                        OCID: "",
                        OCQRCode: "",
                        OCQRCodeURL: ""
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
                    BoxQRCodeURL: box.BoxQRCodeURL,
                    ICID: box.IC_ICID,
                    ICQRCode: box.IC_ICQRCode,
                    ICQRCodeURL: box.IC_ICQRCodeURL,
                    OCID: box.IC_OC_OCID,
                    OCQRCode: box.IC_OC_OCQRCode,
                    OCQRCodeURL:box.IC_OC_OCQRCodeURL
                }));
            }).flat();

            if (filterNonEmptyBoxQRCode) {
                combinedResult = combinedResult
                    .filter(item => item.BoxQRCode && item.BoxQRCode.trim() !== "")
                    .sort((a, b) => {
                        if (a.ICID > b.ICID) return -1;
                        if (a.ICID < b.ICID) return 1;
                        return 0;
                    });
            }
           
            if (filterNoEmptyICID) {
                combinedResult = combinedResult
                    .filter(item => item.ICID && item.ICID.trim() !== "") // Ensure ICID is non-empty
                    .sort((a, b) => {
                        if (a.OCID && b.OCID) {
                            if (a.OCID > b.OCID) return -1;
                            if (a.OCID < b.OCID) return 1;
                        } else if (a.OCID) {
                            return -1;
                        } else if (b.OCID) {
                            return 1;
                        } else {
                            if (a.ICID > b.ICID) return -1;
                            if (a.ICID < b.ICID) return 1;
                        }
                        return 0; 
                    });
            }
            

            return combinedResult;

        } catch (error) {
            console.error("Error", error);
            req.reject(500, error.message || error);
        }
    });

    srv.on('getBatchOCValueHelp', async (req) => {
        const { BatchID } = req.data;
        
        const results = await SELECT.from('track.OuterContainer')
            .where({ BatchID: BatchID });

        const OCIDList = results.map(item => ({
            OCID: item.OCID
        }));

        return OCIDList;
    });



    const createQRCodeURL = (data) => {
        const qrPayload = JSON.stringify(data);
        return `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrPayload)}`;
    };

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
            const base36String = parseInt(combinedData.substring(0, 8), 16).toString(36);
            const boxQRCode = base36String.slice(0, 10).padStart(10, '0');

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

    const generateUniqueICID = async () => {
        const lastIC = await cds.run(
            SELECT.one.from('track.InnerContainer').columns('ICID').orderBy({ ICID: 'desc' })
        );

        const lastICID = lastIC?.ICID || '06012025';

        const nextICID = String(Number(lastICID) + 1).padStart(8, '0');
        return nextICID;
    };

    srv.on('CREATE', 'InnerContainer', async (req) => {

        const { BatchID, Boxes } = req.data;

        if (!BatchID || !Array.isArray(Boxes) || Boxes.length === 0) {
            req.error(400, "Invalid payload: BatchID and Boxes are required and must be a non-empty array.");
        }

        try {
            const existingBoxes = await cds.run(
                SELECT.from('track.MaterialBox')
                    .columns(['SerialNo', 'IC_ICID'])
                    .where({ SerialNo: { in: Boxes.map((box) => box.SerialNo) } })
            );

            const linkedBoxes = existingBoxes.filter((box) => box.IC_ICID);

            if (linkedBoxes.length > 0) {
                const linkedICIDs = linkedBoxes.map((box) => box.IC_ICID).join(', ');
                req.error(
                    409,
                    `The following boxes are already linked to InnerContainer(s): ${linkedICIDs}.`
                );
            }

            const newICID = await generateUniqueICID();


            const materialBoxes = await cds.run(
                SELECT.from('track.MaterialBox').where({
                    SerialNo: { in: Boxes.map((box) => box.SerialNo) },
                    BoxQRCode: { in: Boxes.map((box) => box.BoxQRCode) },
                })
            );

            if (materialBoxes.length !== Boxes.length) {
                req.error(404, "One or more MaterialBox entries not found.");
            }

            const boxDetails = [];
            for (const box of materialBoxes) {
                const batchDetails = await fetchBatchDetails(BatchID, box.SerialNo);
                if (batchDetails) {
                    boxDetails.push({
                        SerialNo: box.SerialNo,
                        ManufactureDt: batchDetails.ManufactureDt,
                        ExpiryDt: batchDetails.ExpiryDt,
                        ProductionOrder: batchDetails.ProductionOrder,
                        Material: batchDetails.Material,
                        BoxQRCode: box.BoxQRCode,
                    });
                } else {
                    req.error(404, `Batch details not found for SerialNo: ${box.SerialNo}`);
                }
            }

            const combinedData = boxDetails.map((box) => {
                return `${newICID}${box.BoxQRCode}${BatchID}${box.ProductionOrder}`;
            }).join(''); const base36String = parseInt(combinedData.substring(0, 8), 16).toString(36);
            const icQRCode = base36String.slice(0, 10).padStart(10, '0');

            const qrCodePayload = {
                ICID: newICID,
                BatchID: BatchID,
                ManufactureDt: boxDetails[0].ManufactureDt,
                ExpiryDt: boxDetails[0].ExpiryDt,
                ProductionOrder: boxDetails[0].ProductionOrder,
                Material: boxDetails[0].Material,
                UniqueBoxes: boxDetails.map((box) => ({
                    SerialNo: box.SerialNo,
                    BoxQRCode: box.BoxQRCode,
                })),
            };
    
            const icQRCodeURL = createQRCodeURL(qrCodePayload);

            const innerContainerData = {
                ICID: newICID,
                BatchID: BatchID,
                ICQRCode: icQRCode,
                ICQRCodeURL: icQRCodeURL,
            };

            await cds.run(INSERT.into('track.InnerContainer').entries(innerContainerData));

            await cds.run(
                UPDATE('track.MaterialBox')
                    .set({
                        IC_ICID: newICID,
                        IC_ICQRCode: icQRCode,
                        IC_ICQRCodeURL: icQRCodeURL
                    })
                    .where({ SerialNo: { in: Boxes.map((box) => box.SerialNo) } })
            );

            return innerContainerData;
        } catch (error) {
            console.error("Error creating InnerContainer:", error.message);
            req.error(500, `Failed to create InnerContainer: ${error.message}`);
        }
    });

    const generateUniqueOCID = async () => {
        const lastOC = await cds.run(
            SELECT.one.from('track.OuterContainer').columns('OCID').orderBy({ OCID: 'desc' })
        );
    
        const lastOCID = lastOC?.OCID || '00000000';
        return String(Number(lastOCID) + 1).padStart(8, '0');
    };
    srv.on('CREATE', 'OuterContainer', async (req) => {
        const { BatchID, ICs, status } = req.data;
    
        if (!BatchID || !Array.isArray(ICs) || ICs.length === 0) {
            req.error(400, "Invalid payload: BatchID and ICs are required and must be a non-empty array.");
        }
    
        try {
            const existingICs = await cds.run(
                SELECT.from('track.InnerContainer')
                    .columns(['ICID', 'OC_OCID'])
                    .where({ ICID: { in: ICs.map(ic => ic.ICID) } })
            );
    
            const linkedICs = existingICs.filter(ic => ic.OC_OCID);
            if (linkedICs.length > 0) {
                const linkedOCIDs = linkedICs.map(ic => ic.OC_OCID).join(', ');
                req.error(
                    409,
                    `The following InnerContainers are already linked to OuterContainer(s): ${linkedOCIDs}.`
                );
            }
    
            const newOCID = await generateUniqueOCID();
    
            let manufactureDt, expiryDt, productionOrder, material;
    
            const groupedICs = ICs.map(ic => ({ ICID: ic.ICID, Boxes: [] }));
    
            for (const ic of ICs) {
                const boxes = await cds.run(
                    SELECT.from('track.MaterialBox').columns(['SerialNo']).where({ IC_ICID: ic.ICID })
                );
    
                for (const box of boxes) {
                    const batchDetails = await fetchBatchDetails(BatchID, box.SerialNo);
                    if (batchDetails) {
                        manufactureDt = batchDetails.ManufactureDt;
                        expiryDt = batchDetails.ExpiryDt;
                        productionOrder = batchDetails.ProductionOrder;
                        material = batchDetails.Material;
    
                        const icIndex = groupedICs.findIndex(item => item.ICID === ic.ICID);
                        if (icIndex !== -1) {
                            groupedICs[icIndex].Boxes.push({ SerialNo: box.SerialNo });
                        }
                    } else {
                        req.error(404, `Batch details not found for SerialNo: ${box.SerialNo}`);
                    }
                }
            }
    
            const combinedData = ICs.map(ic => `${ic.ICID}${newOCID}${BatchID}`).join('');
            const base36String = parseInt(combinedData.substring(0, 8), 16).toString(36);
            const ocQRCode = base36String.slice(0, 10).padStart(10, '0');
    
            const ocQRCodeURL = createQRCodeURL({
                OCID: newOCID,
                BatchID: BatchID,
                status: status || 'Inventory',
                ManufactureDt: manufactureDt,
                ExpiryDt: expiryDt,
                ProductionOrder: productionOrder,
                Material: material,
                ICs: groupedICs,
            });
    
            const newOuterContainer = {
                OCID: newOCID,
                OCQRCode: ocQRCode,
                OCQRCodeURL: ocQRCodeURL,
                BatchID: BatchID,
                status: status || 'Inventory',
                VendorId: "",
                VendorName: "",
                ManufactureDt: manufactureDt,
                ExpiryDt: expiryDt,
                ProductionOrder: productionOrder,
                Material: material,
            };
    
            await cds.run(INSERT.into('track.OuterContainer').entries(newOuterContainer));
    
            for (const ic of ICs) {
                await cds.run(
                    UPDATE('track.InnerContainer')
                        .set({
                            OC_OCID: newOCID,
                            OC_OCQRCode: ocQRCode,
                            OC_OCQRCodeURL: ocQRCodeURL
                        })
                        .where({ ICID: ic.ICID })
                );
            }
    
            return {
                ...newOuterContainer,
                ICs: groupedICs,
            };
        } catch (error) {
            console.error("Error creating OuterContainer:", error.message);
            req.reject(500, error.message || "Failed to create OuterContainer.");
        }
    });
    






   














};

