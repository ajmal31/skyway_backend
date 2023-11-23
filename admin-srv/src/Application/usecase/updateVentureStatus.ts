import publish from "../../message-broker/publisher/publish"
const updateVentureStatus = async (data:Record<string,any>) => {


    console.log('status',data)
    const response = await publish('VENTURE_SRV',data)
    console.log('after sending to venture srv',response)

}

export default updateVentureStatus