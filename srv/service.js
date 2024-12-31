const cds = require('@sap/cds');

module.exports = async (srv) => {

   srv.on('CREATE','BoxLineItem',async(req)=>{
    const lastItem = await cds.run(SELECT.one.from('BoxLineItem').columns('ProdcuctID').orderBy({ ProdcuctID: 'desc' }));
    let nextId = "0001"; 
    if(lastItem && lastItem.ProdcuctID){
        const lastId = parseInt(lastItem.ProdcuctID, 10);
            nextId = String(lastId + 1).padStart(4, '0');
    }
    const hexTimestamp = Date.now().toString(16);
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16); 
    const nextQrCodeId = `QR${hexTimestamp}${randomHex.padStart(6, '0')}`;
    req.data.ProdcuctID = nextId;
    req.data.QrCodeId = nextQrCodeId;
    await cds.run(INSERT.into('BoxLineItem').entries(req.data))
    
    const insertedRecord = await cds.run(
        SELECT.one.from('BoxLineItem').where({ ProdcuctID: nextId })
    );
    return insertedRecord;   
})   

   srv.on('READ','BoxLineItem',async(req)=>{
    return cds.run(SELECT.from('BoxLineItem'))
   })
};


