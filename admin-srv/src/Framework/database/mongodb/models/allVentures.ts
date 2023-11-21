
import mongoose,{Schema,Document} from 'mongoose'

const ventureReplicationModel:Schema<Document>=new Schema({},{strict:false})
const ventureReplicationSchema=mongoose.model<Document>('replicated-ventures',ventureReplicationModel)
export default ventureReplicationSchema