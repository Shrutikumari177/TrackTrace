using {track} from '../db/Schema';

service trackservice {
    entity BoxLineItem as projection on track.BoxLineItem;
    entity BoxCollection as projection on track.BoxCollection;
    entity InnerContainer as projection on track.InnerContainer;
}
