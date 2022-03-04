/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const tweetData = [
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweets-container');
    for (let tweet of tweets) {
      // console.log('tweet => ',tweet);
      const $tweetEl = createTweetElement(tweet);
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $tweetContainer.prepend($tweetEl);
    }
  };

  const createTweetElement = (tweetPar) => {
    const $tweet = $(` <article>
    <header class="tweet-header">
      <div id="profile-info">
        <img id="pp" src="https://i.imgur.com/73hZDYK.png" alt="Profile Picture">
        <label for="img">${tweetPar.user.name}</label>
      </div>
      <span>${tweetPar.user.handle}</span>
    </header>
    <p class="tweet-card" type="text" placeholder="Tweet">${tweetPar.content.text}</p>
    <footer>
      <output for="input">${tweetPar.created_at}</output>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  };

  renderTweets(tweetData);
  // console.log($tweet); // to see what it looks like
  
  // console.log(renderTweets(tweetData));
  // console.log($('form'));
  $('form').submit(function(event) {
    event.preventDefault();
    // console.log($(this).serialize());

    const serial = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serial
    });
  });
});