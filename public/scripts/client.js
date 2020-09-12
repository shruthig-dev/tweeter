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

//Handle vulnerable to XSS
const escape = function (str) {
  let div = document.createElement('div');

  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
const formatDate = function (date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

//create tweet content dynamically
const createTweetElement = function (tweet) {
  let $tweet = `
          <article class="tweetContainer">
            <header>
            <div class="user-profile">
              <img src=${tweet.user.avatars}></img>
            <span class = "user-name">${tweet.user.name}</span>
         </div>
         <p class ="tweet-name">${tweet.user.handle}</p>
            </header>
            <p class="tweet-text">${escape(tweet.content.text)}</p>
            <footer><span>${formatDate(tweet.created_at)}</span>
            <span>icons</span>
            </footer>
          </article>
    ` ;
  return $tweet;
}

const renderTweets = function (tweets) {
  $('#display-tweets').empty();
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#display-tweets').append($tweet);
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
function showCreateTweet() {
  $("#create-tweet").show();
}
$(document).ready(function () {
  loadTweets();

  $("#create-tweet").hide();
  $("#error-message").hide();

  setInterval(function () {
    $(".arrow").animate({ marginTop: 10 });
    $(".arrow").animate({ marginTop: 0 });
  }, 1000);

  //Twitter Form submission 
  $(".tweet-form").on('submit', function (evt) {
    evt.preventDefault();
    let tweetText = $('#tweet-text').val();

    if (!tweetText) {
      $("#error-text").html("Please enter tweet");
      $("#error-message").show();
    }
    else if (tweetText.length > 140) {
      $("#error-text").html("Tweet character should be less than 140 characters");
      $("#error-message").show();
    }
    else {
      const serializeTweetData = $('#tweet-text').serialize();
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: serializeTweetData
      }).then(function () {
        loadTweets();
        $("#error-text").html("");
        $("#error-message").hide();
        $('#tweet-text').val('');
      });
    }
  });
});