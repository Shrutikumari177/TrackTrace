const cds = require('@sap/cds');

module.exports = async (srv) => {



    const ZAPI_PRODUCTION_ORDERS = await cds.connect.to("ZAPI_PRODUCTION_ORDERS");
    srv.on('READ', 'A_ProductionOrder', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'A_ProductionOrderComponent', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'A_ProductionOrderItem', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'A_ProductionOrderOperation', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'A_ProductionOrderStatus', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'A_ProductionRsceTools', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'FunctionMessageSet', req => ZAPI_PRODUCTION_ORDERS.run(req.query));
    srv.on('READ', 'ReleaseMessageSet', req => ZAPI_PRODUCTION_ORDERS.run(req.query));

    const ZAPI_PROD_ORDER_CONFIRMATION_2_SRV = await cds.connect.to("ZAPI_PROD_ORDER_CONFIRMATION_2_SRV");
    srv.on('READ', 'ProdnOrdConf2', req => ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.run(req.query));
    srv.on('READ', 'ProdnOrdConfMatlDocItm', req => ZAPI_PROD_ORDER_CONFIRMATION_2_SRV.run(req.query));




    const ZTRACK_TRACE_SRV = await cds.connect.to("ZTRACK_TRACE_SRV");
    srv.on('READ', 'zbatchdetails_Track', req => ZTRACK_TRACE_SRV.run(req.query));
    srv.on('READ', 'zbatchno_track', req => ZTRACK_TRACE_SRV.run(req.query));
    srv.on('READ', 'ztrack_material', req => ZTRACK_TRACE_SRV.run(req.query));
    srv.on('READ', 'zorderType_Track', req => ZTRACK_TRACE_SRV.run(req.query));



    // srv.on('getBatchIDRelevantData', async (req) => {
    //     try {
    //         const { BatchNo, filterNonEmptyBoxQRCode ,filterNoEmptyICID} = req.data;

    //         if (!BatchNo) {
    //             req.reject(400, "The parameter 'BatchNo' is required.");
    //         }

    //         const query = SELECT.from('zbatchdetails_Track')
    //             .columns(['BatchNo', 'SerialNo', 'Material', 'ManufactureDt', 'ExpiryDt', 'ProductionOrder'])
    //             .where({ BatchNo });

    //         const result = await ZTRACK_TRACE_SRV.run(query);

    //         if (!result || result.length === 0) {
    //             req.reject(404, "No records found for the provided Batch ID.");
    //         }

    //         const SerialNos = result.map(item => item.SerialNo);

    //         const resultData = await SELECT.from('track.MaterialBox')
    //             .columns(['BoxQRCode', 'BoxQRCodeURL', 'SerialNo', 'IC_ICQRCode', 'IC_ICQRCodeURL', 'IC_ICID',
    //                 'IC.OC_OCID', 'IC.OC_OCQRCode', 'IC.OC_OCQRCodeURL']).where({
    //                     BatchID: BatchNo,
    //                     SerialNo: { in: SerialNos }
    //                 });



    //         let combinedResult = result.map(batchItem => {
    //             const matchedBoxData = resultData.filter(box => box.SerialNo === batchItem.SerialNo);

    //             if (matchedBoxData.length === 0) {
    //                 return {
    //                     BatchNo: batchItem.BatchNo,
    //                     SerialNo: batchItem.SerialNo,
    //                     Material: batchItem.Material,
    //                     ManufactureDt: batchItem.ManufactureDt,
    //                     ExpiryDt: batchItem.ExpiryDt,
    //                     ProductionOrder: batchItem.ProductionOrder,
    //                     BoxQRCode: "",
    //                     BoxQRCodeURL: "",
    //                     ICID: "",
    //                     ICQRCode: "",
    //                     ICQRCodeURL: "",
    //                     OCID: "",
    //                     OCQRCode: "",
    //                     OCQRCodeURL: ""
    //                 };
    //             }

    //             return matchedBoxData.map(box => ({
    //                 BatchNo: batchItem.BatchNo,
    //                 SerialNo: batchItem.SerialNo,
    //                 Material: batchItem.Material,
    //                 ManufactureDt: batchItem.ManufactureDt,
    //                 ExpiryDt: batchItem.ExpiryDt,
    //                 ProductionOrder: batchItem.ProductionOrder,
    //                 BoxQRCode: box.BoxQRCode,
    //                 BoxQRCodeURL: box.BoxQRCodeURL,
    //                 ICID: box.IC_ICID,
    //                 ICQRCode: box.IC_ICQRCode,
    //                 ICQRCodeURL: box.IC_ICQRCodeURL,
    //                 OCID: box.IC_OC_OCID,
    //                 OCQRCode: box.IC_OC_OCQRCode,
    //                 OCQRCodeURL:box.IC_OC_OCQRCodeURL
    //             }));
    //         }).flat();

    //         if (filterNonEmptyBoxQRCode) {
    //             combinedResult = combinedResult
    //                 .filter(item => item.BoxQRCode && item.BoxQRCode.trim() !== "")
    //                 .sort((a, b) => {
    //                     if (a.ICID > b.ICID) return -1;
    //                     if (a.ICID < b.ICID) return 1;
    //                     return 0;
    //                 });
    //         }

    //         if (filterNoEmptyICID) {
    //             combinedResult = combinedResult
    //                 .filter(item => item.ICID && item.ICID.trim() !== "") // Ensure ICID is non-empty
    //                 .sort((a, b) => {
    //                     if (a.OCID && b.OCID) {
    //                         if (a.OCID > b.OCID) return -1;
    //                         if (a.OCID < b.OCID) return 1;
    //                     } else if (a.OCID) {
    //                         return -1;
    //                     } else if (b.OCID) {
    //                         return 1;
    //                     } else {
    //                         if (a.ICID > b.ICID) return -1;
    //                         if (a.ICID < b.ICID) return 1;
    //                     }
    //                     return 0; 
    //                 });
    //         }


    //         return combinedResult;

    //     } catch (error) {
    //         console.error("Error", error);
    //         req.reject(500, error.message || error);
    //     }
    // });



    srv.on('getBatchIDRelevantData', async (req) => {
        try {
            const { BatchNo, ManufactureDt, ProductionOrder, filterNonEmptyBoxQRCode, filterNoEmptyICID } = req.data;

            if (!BatchNo && !ManufactureDt && !ProductionOrder) {
                req.reject(400, "At least one of 'BatchNo', 'ManufactureDt', or 'ProductionOrder' is required.");
            }

            let batchQuery = SELECT.from('zbatchdetails_Track')
                .columns(['BatchNo', 'SerialNo', 'Material', 'ManufactureDt', 'ExpiryDt', 'ProductionOrder']);

            if (BatchNo) {
                batchQuery.where({ BatchNo });
            } else if (ManufactureDt) {
                batchQuery.where({ ManufactureDt });
            } else if (ProductionOrder) {
                batchQuery.where({ ProductionOrder });
            }

            const batchDetails = await ZTRACK_TRACE_SRV.run(batchQuery);

            if (!batchDetails || batchDetails.length === 0) {
                req.reject(404, "No records found for the provided filters.");
            }



            const uniqueBatchIDs = BatchNo ? [BatchNo] : [...new Set(batchDetails.map(item => item.BatchNo))];
            const serialNos = batchDetails.map(item => item.SerialNo);

            const resultData = await SELECT.from('track.MaterialBox')
                .columns([
                    'BoxQRCode', 'BoxQRCodeURL', 'SerialNo',
                    'IC_ICQRCode', 'IC_ICQRCodeURL', 'IC_ICID',
                    'IC.OC_OCID', 'IC.OC_OCQRCode', 'IC.OC_OCQRCodeURL'
                ])
                .where({
                    BatchID: { in: uniqueBatchIDs },
                    SerialNo: { in: serialNos }
                });

            console.log("Material Box Data:", resultData);

            let combinedResult = batchDetails.map(batchItem => {
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
                    OCQRCodeURL: box.IC_OC_OCQRCodeURL
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
            console.error("Error:", error);
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

    srv.on('getBatchOcDealerMappingdata', async (req) => {
        try {
            const { BatchID, OCID } = req.data;

            if (!BatchID || !OCID) {
                return req.reject(400, 'BatchID and OCID are required');
            }

            const batchDetails = await ZTRACK_TRACE_SRV.run(
                SELECT.one
                    .from('zbatchdetails_Track')
                    .columns(['ManufactureDt', 'ExpiryDt', 'ProductionOrder'])
                    .where({ BatchNo: BatchID })
            );

            if (!batchDetails) {
                return req.reject(404, `No details found for BatchID: ${BatchID}`);
            }

            const innerContainerCount = await SELECT.from('track.InnerContainer')
                .where({ BatchID, OC_OCID: OCID })
                .columns('ICID')
                .then(rows => rows.length);

            const OuterContainerData = await SELECT.from('track.OuterContainer')
                .where({ BatchID, OCID })
                .columns('VendorId', 'VendorName');

            if (OuterContainerData.length === 0) {
                return req.reject(404, `No OuterContainer found for BatchID: ${BatchID} and OCID: ${OCID}`);
            }

            const { VendorId, VendorName } = OuterContainerData[0];

            return {
                OCID,
                ProductionOrder: batchDetails.ProductionOrder,
                BatchID,
                ManufactureDt: batchDetails.ManufactureDt,
                ExpiryDt: batchDetails.ExpiryDt,
                Quantity: innerContainerCount,
                VendorId,
                VendorName
            };
        } catch (error) {
            console.error('Error:', error);
            return req.reject(500, error.message);
        }
    });

    srv.on('getProductionTrackingDashboardData', async (req) => {
        try {
            const { OCID } = req.data;

            if (!OCID) {
                return req.reject(400, "'OCID' is a required parameter.");
            }

            const outerContainerData = await SELECT.one.from('track.OuterContainer')
                .columns([
                    'OCID',
                    'OCQRCode',
                    'OCQRCodeURL',
                    'BatchID',
                    'status',
                    'VendorId',
                    'VendorName'
                ])
                .where({ OCID });

            if (!outerContainerData) {
                return req.reject(404, "No data found for the provided OCID.");
            }

            const { BatchID } = outerContainerData;


            const response = {
                OCID: outerContainerData.OCID,
                OCQRCode: outerContainerData.OCQRCode,
                OCQRCodeURL: outerContainerData.OCQRCodeURL,
                BatchID: outerContainerData.BatchID,
                status: outerContainerData.status,
                VendorId: outerContainerData.VendorId || "",
                VendorName: outerContainerData.VendorName || "",
                ManufactureDt: null,
                ExpiryDt: null,
                ProductionOrder: null,
                Material: null,
                ICs: []
            };

            const icData = await SELECT.from('track.MaterialBox')
                .columns([
                    'IC_ICID as ICID',
                    'IC_ICQRCode as ICQRCode',
                    'IC_ICQRCodeURL as ICQRCodeURL',
                    'SerialNo',
                    'BoxQRCode',
                    'BoxQRCodeURL',
                    'IC.OC_OCID'
                ])
                .where({ 'IC.OC_OCID': OCID, BatchID });

            if (icData.length > 0) {
                const groupedICs = icData.reduce((acc, item) => {
                    if (!acc[item.ICID]) {
                        acc[item.ICID] = {
                            ICID: item.ICID,
                            ICQRCode: item.ICQRCode,
                            ICQRCodeURL: item.ICQRCodeURL,
                            Boxes: []
                        };
                    }
                    acc[item.ICID].Boxes.push({
                        SerialNo: item.SerialNo,
                        BoxQRCode: item.BoxQRCode,
                        BoxQRCodeURL: item.BoxQRCodeURL
                    });
                    return acc;
                }, {});
                response.ICs = Object.values(groupedICs);
            }

            // Fetch batch details if available
            const batchDetails = await ZTRACK_TRACE_SRV.run(
                SELECT.one
                    .from('zbatchdetails_Track')
                    .columns(['ManufactureDt', 'ExpiryDt', 'ProductionOrder', 'Material'])
                    .where({ BatchNo: BatchID })
            );

            if (batchDetails) {
                Object.assign(response, {
                    ManufactureDt: batchDetails.ManufactureDt,
                    ExpiryDt: batchDetails.ExpiryDt,
                    ProductionOrder: batchDetails.ProductionOrder,
                    Material: batchDetails.Material
                });
            }

            return response;

        } catch (error) {
            console.error("Error in getProductionTrackingDashboardData:", error);
            return req.reject(500, error.message || "Internal Server Error");
        }
    });

    srv.on('getDealerDashOCValueHelp', async (req) => {
        const { VendorId } = req.data;

        const results = await SELECT.from('track.OuterContainer')
            .where({ VendorId: VendorId });

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
            const groupedICs = [];

            for (const ic of ICs) {
                const existingGroupedIC = groupedICs.find(groupedIC => groupedIC.ICID === ic.ICID);

                if (!existingGroupedIC) {
                    groupedICs.push({ ICID: ic.ICID, Boxes: [] });
                }

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

                        const currentIC = groupedICs.find(item => item.ICID === ic.ICID);
                        if (currentIC) {
                            const serialExists = currentIC.Boxes.some(b => b.SerialNo === box.SerialNo);
                            if (!serialExists) {
                                currentIC.Boxes.push({ SerialNo: box.SerialNo });
                            }
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

    srv.on('UPDATE', 'OuterContainer', async (req) => {
        try {
            const { OCID, OCQRCode, OCQRCodeURL, VendorId, VendorName, status } = req.data;

            if (!OCID || !VendorId || !VendorName || !status) {
                return req.reject(400, 'OCID, VendorId, VendorName, and status are required.');
            }

            const existingOC = await cds.run(
                SELECT.from('track.OuterContainer')
                    .where({ OCID })
            );



            if (!existingOC || existingOC.length === 0) {
                return req.reject(404, `OuterContainer with OCID: ${OCID} not found.`);
            }
            const sOCQRCode = existingOC[0].OCQRCode;
            const sOCQRCodeURL = existingOC[0].OCQRCodeURL


            const updateResult = await cds.run(
                UPDATE('track.OuterContainer')
                    .set({
                        VendorId,
                        VendorName,
                        status
                    })
                    .where({ OCID, OCQRCode: sOCQRCode, OCQRCodeURL: sOCQRCodeURL })
            );

            if (updateResult === 0) {
                return req.reject(500, `Failed to update OuterContainer for OCID: ${OCID}, OCQRCode: ${OCQRCode}, and OCQRCodeURL: ${OCQRCodeURL}`);
            }

            return {
                message: `OuterContainer updated successfully for OCID: ${OCID}`

            };
        } catch (error) {
            console.error('Error updating OuterContainer:', error.message);
            req.reject(500, error.message);
        }
    });



































};

