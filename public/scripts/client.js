/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//create tweet content dynamically
const createTweetElement = function (tweet) {
  let $tweet = `
          <article class="tweetContainer">
            <header>
            <div class="user-profile">
              <img src="${tweet.user.avatars}"></img>
            <span class = "user-name">${tweet.user.name}</span>
         </div>
         <p class ="tweet-name">${tweet.user.handle}</p>
            </header>
            <p class="tweet-text">"${tweet.content.text}"</p>
            <footer><span>${tweet.created_at}</span>
            <span>icons</span>
            </footer>
          </article>
    ` ;
  return $tweet;
}

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweetData of tweets) {
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').append($tweet);
  }
}

/* 
 load all tweets data 
*/
const loadTweets = function () {
  $.ajax('/tweets/',
    {
      method: 'GET',
      dataType: 'JSON'
    }).then(function (response) {
      renderTweets(response)
    });
}

$(document).ready(function () {
  loadTweets();

  //Twitter Form submission 
  $(".tweet-form").on('submit', function (evt) {
    evt.preventDefault();
    const serializeTweetData = $('#tweet-text').serialize();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: serializeTweetData
    }).then(function () {
      loadTweets();
    });
  });
});