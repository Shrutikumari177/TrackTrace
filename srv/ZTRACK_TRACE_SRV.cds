using ZTRACK_TRACE_SRV from './external/ZTRACK_TRACE_SRV.cds';

service ZTRACK_TRACE_SRVSampleService {
    
    entity ZProductionOrder_track as projection on ZTRACK_TRACE_SRV.ZProductionOrder_track
    {        key ProductionOrder     }    
;
}