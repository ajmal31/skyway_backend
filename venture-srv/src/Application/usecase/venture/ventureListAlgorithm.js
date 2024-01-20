const ventureListAlgorithm = (Allventures) => {

    //Connection sort    
    let sort_one = Allventures.sort((item1, item2) => item2?.connections_count - item1?.connections_count)

    //Average rating sort
    let sort_two = Allventures.sort((item1, item2) => {
        let average1 = item1.rating_sum / item1.rated_users_count;
        let average2 = item2.rating_sum / item2.rated_users_count;
        if (!average1) average1 = 0
        if (!average2) average2 = 2

        // Sort in descending order based on the average rating
        return average2 - average1;
    });
    let avg_store = []
    //Adding rating average each ventures   
    for (let i = 0; i < Allventures.length; i++) {

        let elem = Allventures[i]
        //avg rounded nearest integer
        let avg = elem.rating_sum / elem.rated_users_count

        let rounded = Math.round(avg * 2) / 2
        if ((rounded * 10) % 10 < 5) rounded = Math.floor(rounded)
        if (rounded > 5) rounded = 5
        if(!rounded)rounded=0

        avg_store.push(rounded)

    }

    let payload = {
        Allventures,
        avg_store
    }
    return payload

}
export default ventureListAlgorithm