import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Heartbeat} from "../types";


export async function handleHeartbeat(event: SubstrateEvent): Promise<void> {

    const hb=new Heartbeat(
        `${event.block.block.header.number.toNumber()}-${event.idx}`
    );

    hb.authorityId="TEST";

    await hb.save()
}



