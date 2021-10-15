import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";

import {EventId} from "@polkadot/types/interfaces";

import {Heartbeat as SubstrateHeartbeat} from "@polkadot/types/interfaces/imOnline";

import {Heartbeat} from "../types";


const HeartBeatEvent =  "0x0c00" ;

export async function handleHeartbeat(event: SubstrateEvent): Promise<void> {

    const eventType:EventId = event.event.index as EventId;

    if (eventType.toString() === HeartBeatEvent){

        logger.info(JSON.stringify(event.extrinsic.extrinsic.toHuman()));

        const eventId=`${event.block.block.header.number.toNumber()}-${event.idx}`;
        const shb=event.extrinsic.extrinsic.method.args[0] as SubstrateHeartbeat;


        logger.info(JSON.stringify(shb.networkState.peerId));


        const hb=new Heartbeat(eventId);
        hb.authorityId=event.event.data[0].toString();
        hb.peerId=shb.networkState.peerId.toHex();
        hb.networkAddress=shb.networkState.externalAddresses[0].toHuman().toString();
        await hb.save()
    }

}



