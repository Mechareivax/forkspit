const gallery = document.querySelector(".gallery");
const url = "https://graph.facebook.com/v14.0/"
const userID = "17841455049842054";
const accessToken = "EAASZAQFSwPqgBAAS6BeFqAY5wTLtM7lQO6bCDZCp5Q3F9huFJQZBmvbLlpnxrOC0KqKPoXIu5g15dvYyS3Lb14bmFFfyPEhAgSbd01OqDF40avPhfgKZB6f6L9VZBgduYRo32wWlpLwcn1NFN7SBI9UUOxWKZABmgsdOdTY5GUQqM3xMOm4CLs05lVI5n4TPsZD";
const endpoint = url + userID + '?fields=business_discovery.username(fork_spit){media{id,caption,media_type,media_url,permalink}}&access_token=' + accessToken; 


function getPosts () {
   fetch(endpoint)
   .then((response) => response.json())
   .then((data) => {
        let postsArr = data.business_discovery.media.data;
        postsArr.forEach(post => {
            // The posts that get displayed will be only images with the #forkspit tag
            if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
                if(post.caption.includes("#forkspit")) {
                    console.log(post.media_url);
                    const pictureLink = document.createElement('a');
                    const pictureImg = document.createElement('img')

                    pictureLink.href = post.permalink; // Actual link to IG post
                    pictureLink.target = "_blank"; // Opens in new tab

                    pictureImg.src = post.media_url;
                    
                    //The structure of each picture is an "a" tag with an "img" tag inside
                    pictureLink.appendChild(pictureImg);
                    gallery.appendChild(pictureLink);
                }
            }
        });
   });
}

getPosts();
