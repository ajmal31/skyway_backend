
import mongoose,{Schema,Document} from 'mongoose'

const userReplicatedSchema:Schema<Document>=new Schema({},{strict:false})

const user_replication=mongoose.model<Document>('replicates_user',userReplicatedSchema)

export default user_replication
