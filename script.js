document.addEventListener("DOMContentLoaded", () => {
    getData(1);
});

function getData(page) {
    fetch(`https://digimon-api.vercel.app/api/digimon`)
        .then((response) => response.json())
        .then((data) => {
            const itemsPerPage = 12; // Set the number of items per page
            const startIdx = (page - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const displayedData = data.slice(startIdx, endIdx);

            let datas = "";

            displayedData.forEach((post) => {
                datas +=
                    `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <div class="card">
                            <img src="${post.img}" class="card-img-top img-fluid" alt="${post.name}">
                            <div class="card-body" class="pl-6 pr-6">
                                <h6>${post.name}</h6>
                                <p>${post.level}</p>
                            </div>
                        </div>
                    </div>`;
            });

            document.getElementById("datas").innerHTML = datas;
            createPagination(data.length, page);
        })
        .catch((err) => console.log(err));
}

function createPagination(totalData, currentPage) {
    const itemsPerPage = 12;
    const totalPages = Math.ceil(totalData / itemsPerPage);

    let pagination = "";

    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            pagination += `<li class="page-item active"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
        } else {
            pagination += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
        }
    }

    document.getElementById("pagination").innerHTML = pagination;
}

function changePage(page) {
    getData(page);
}