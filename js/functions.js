// * Get Data
async function getData(category = "general", search = "", page = 1) {

    const parameters = new URLSearchParams({
        category: category,
        q: search,
        from: "2026-08-22",
        apiKey: "9866e34e31044c538589788f1aa9828d",
        pageSize: 10,
        page: page
    });

    let response = await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);

    let data = await response.json();

    console.log(data)

    showData(data, page);

}

function showData(data, currentPage) {
    let numberOfPages = Math.ceil(data.totalResults / 10),
        allData = data.articles,
        $cardsContainer = $("#Body .content");


    if (allData.length > 0) {
        $cardsContainer.html("");

        allData.forEach(item => {
            $cardsContainer.append(cardComponent(item));
        });

        $("nav .pagination").html(createPagination(currentPage, numberOfPages));
    }
}

function cardComponent(item) {
    return `
        <div class="box col-10 col-sm-6 col-md-12 col-lg-6 mx-auto mx-sm-0">
            <div class="card d-flex flex-md-row">
                <div class="image">
                    <img src="${item.urlToImage}" onerror=" this.src = 'images/image.jpg' " alt="image">
                </div>
                <div class="card-body d-flex flex-column ">
                    <a href="${item.url ?? "#"}" target="_blank" class="btn btn-primary">Show More</a>
                    
                    <h5 class="card-title">
                    ${(item.title == undefined) ? "this post has no description" : item.title?.slice(0, 20)}
                    </h5>
                    <p class="card-text mb-5 mb-sm-3">
                        ${(item.description == undefined) ? "this post has no description" : item.description?.slice(0, 150)}
                    </p>
                </div>
            </div>
        </div>
    `
}

// * Pagination

function createPagination(currentPage, totalPages) {

    let liEle = `
        <li class="page-item">
            <button class="page-link" ${(currentPage == 1) ? "disabled" : ""}  onclick="paginate(${(currentPage > 1) ? (currentPage - 1) : 1})">
                <i class="fa-solid fa-square-caret-left"></i>
            </button>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        liEle += `
            <li class="page-item ${(currentPage == i) ? "active" : ""}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>
        `
    }

    liEle += `
        <li class="page-item">
            <button class="page-link" ${(currentPage == totalPages) ? "disabled" : ""}  onclick="paginate(${(currentPage <= totalPages) ? (currentPage + 1) : totalPages})">
                <i class="fa-solid fa-square-caret-right"></i>
            </button>
        </li>
    `;

    return liEle;
}

function paginate(pageNumber) {
    let category = $("#Category").val(),
        search = $("#Search").val();

    getData(category, search, pageNumber);
}

// * Form
$("form").submit(function (e) {
    e.preventDefault();
    let category = $("#Category").val(),
        search = $("#Search").val();

    getData(category, search);
});