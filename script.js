var apiKey = "AIzaSyBhrTxyRdnZdChUBzuXT2iokXYwj3CXBsY";
var videoUrl = "https://www.googleapis.com/youtube/v3/videos?";
var channelUrl = "https://www.googleapis.com/youtube/v3/channels?";
var searchUrl="https://www.googleapis.com/youtube/v3/search?";
var videoCard = document.querySelector(".video-container");
var searchBox=document.querySelector("#search-box");
var searchBtn=document.querySelector("#search-btn");
fetch(videoUrl + new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(element => {
            getChannelIcon(element);
        });
    })
    .catch(err => console.log(err));

const getChannelIcon = (videoData) => {
    fetch(channelUrl + new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: videoData.snippet.channelId

    }))
        .then(res => res.json())
        .then(data => {
            videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            
            makeVideoCard(videoData);
        })
}
const makeVideoCard = (data) => {
    videoCard.innerHTML += `<div class="video" onclick="location.href='http://youtube.com/watch/v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content"><img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>   `;
       
}

searchBtn.addEventListener("click",()=>{
    var searchtext=searchBox.value;
    fetch(searchUrl + new URLSearchParams({
        key: apiKey,
        part:"snippet",
        maxResults: 50,
        search_query:"searchBox.value",
        regionCode: 'IN'
        
    }))
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        data.items.forEach(element => {
            getChannelIcon(element);
        })
    })
})
