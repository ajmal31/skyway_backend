import mongoose from "mongoose"

const connection = (uri: any) => {


    mongoose.connect(uri)
    // mongoose.set('debug', true);
   
    mongoose.connection.once('open', () => {
        console.log('mongodb connected succesful')
    })
    mongoose.connection.on('error', () => {
        console.log(`error occured while connecting mongoose `)
    })

}
export default connection