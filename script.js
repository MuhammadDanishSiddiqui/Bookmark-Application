
function saveBookmark(){
  var siteName=document.getElementById("site_name").value
  var siteUrl=document.getElementById("site_url").value
  
 if(siteName=="" || siteUrl=="")
  {
    alert("Please fil the form")
    return false
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex))
  {
    alert("Please give valid url")
    return false
  }
  var bookmark={
    name:siteName,
    url:siteUrl
  }

  if(localStorage.getItem("bookmarks")===null)
  {
    var bookmarks=[]
    bookmarks.push(bookmark)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
  }
  else{
    var bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
    bookmarks.push(bookmark)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
  }
  document.getElementById("site_name").value=""
  document.getElementById("site_url").value=""
  fetchBookmarks()
}

function fetchBookmarks(){
  var bookmarklist=document.querySelector(".bookmarklist")
  bookmarklist.innerHTML=""
  var bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
  for(i=0;i<bookmarks.length;i++){
    var name=bookmarks[i].name
    var url=bookmarks[i].url
    bookmarklist.innerHTML+=`<div class="bookmarklist_div"><h3>${name}</h3><button class="visitbtn"><a target="_blank" href="${url}">visit</a></button>
    <button onclick="deleteBookmark(${url})" class="deletebtn">Delete</button></div>`
  }
}

function deleteBookmark(url){
  var bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
  for(i=0;i<bookmarks.length;i++){ 
    if(bookmarks[i].url===url)
    bookmarks.splice(i,1)
  }
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
  fetchBookmarks()
}
function clearBookmark(){
  localStorage.removeItem("bookmarks")
  var bookmarklist=document.querySelector(".bookmarklist")
  bookmarklist.innerHTML=""
}