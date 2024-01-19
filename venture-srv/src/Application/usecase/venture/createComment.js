const createComment=async(dbRepo,data,uid)=>{

 let {vid,userName,content,rating}=data
 
 // taking user comment based on particular venture
 const comment=await dbRepo.getOneComment(uid,vid)
 console.log("comment exited or not",comment)
 if(comment?.length!==0){

       const existingRate=comment[0]?.rating
       const currentRating=rating
       console.log("existing rating",existingRate)
       console.log("current rating",currentRating)
       //Finding the final rating
       let final=currentRating-existingRate
       console.log("final rating",final)
       //increment the comapany rating sum
       const key="rating_sum"
       const updated=await dbRepo.updateVentureRatingSum(vid,final,key)
       


 }else{

      //increment the rated users count
      const key_one="rated_users_count"
      const key_two="rating_sum"
      //add the rating to existing rating sum 
      const [ratedUsersCountUpdated,ratingSumUpdated]=await Promise.all([

        dbRepo.updateVentureRatedUsersCount(vid,1,key_one),
        dbRepo.updateVentureRatingSum(vid,rating,key_two)

      ])
      
    
 }

 const response =await dbRepo.createComment(content,vid,userName,uid,rating)
 return response

}

export default createComment