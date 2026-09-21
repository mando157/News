

// async function getData(category , search ,  page = 1) {

//     const parameters = new URLSearchParams({
//         q : search,
//         category: category,
//         pageSize : 10 ,
//         apiKey: "c9187ed445b349538b05e30078a6ea04"
//     });

//     let response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);

//     let data = await response.json();

//     console.log(data);
// }

// getData("business" , "");