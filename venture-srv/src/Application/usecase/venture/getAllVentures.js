const listVentures = async (dbRepo, type) => {


     const Allventures = await dbRepo.getAllVentures(type)


     // console.log("all ventures",Allventures)

     let sort_one = Allventures.sort((item1, item2) => item2?.connections_count - item1?.connections_count)

     //sort based averate rating
     let sort_two = Allventures.sort((item1, item2) => {
          const average1 = item1.rating_sum / item1.rated_users_count;
          const average2 = item2.rating_sum / item2.rated_users_count;
         console.log("average",average1,average2)
          // Sort in descending order based on the average rating
          return average2 - average1;
        });
        
     //    console.log("sorted",sort_one);
   

     if (!Allventures) return { find: false }
     return Allventures

}

export default listVentures