function showSearch() {
    document.getElementById("search-popup").style.display = "flex";
};

function hideSearch() {
    document.getElementById("search-popup").style.display = "none";
}

function searchPost(e) {
    e.preventDefault()
    const searchID = document.getElementById("searchQuery").value
    const searchUrl = "https://www.barndominiumlife.com/?s=" + searchID
    window.location = searchUrl;
}

var ids = []

window.onload = function () {
    document.getElementById("whole_page").style.display = "block";
    jQuery.ajax({
        type: 'GET',
        url: 'https://www.barndominiumlife.com/wp-json/wp/v2/posts/?_fields[]=id',
        success: function (result) {
            for (let i = 0; i < 3; i++) {
                ids.push(result[i].id)
                jQuery.ajax({
                    type: 'GET',
                    url: 'https://www.barndominiumlife.com/wp-json/wp/v2/posts/?include[]=' + ids[i],
                    success: function (res) {
                        console.log(res)
                        jQuery("#recent" + i).append(`<a href="${res[0].link}" target="_blank" rel="noopener">${res[0].title.rendered}</a>`)

                    },
                    error: function (err) {
                        console.log(err)
                    }
                });

                console.log(ids)

                jQuery.ajax({
                    type: 'GET',
                    url: 'https://www.barndominiumlife.com/wp-json/wp/v2/posts/' + ids[i] + '?_embed',
                    success: function (res) {
                        console.log(res.featured_media)

                        jQuery.ajax({
                            type: 'GET',
                            url: 'https://www.barndominiumlife.com/wp-json/wp/v2/media/' + res.featured_media,
                            success: function (res) {
                                const recentImg = res.guid.rendered
                                jQuery("#recent" + i).prepend(`<img style="max-width: 376px;width: 100%;max-height: 300px;height: 100%;" src="${recentImg}" alt="${'#recent' + i}">`)
                            },
                            error: function (err) {
                                console.log(err)
                            }
                        });

                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            }
        },
        error: function (e) {
            console.log(JSON.stringify(e));
        }
    });
}