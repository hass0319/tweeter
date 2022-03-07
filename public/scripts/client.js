/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// $(document).ready(function() {

const toTopOfPage = function() {
  $(window).on("scroll", function() {
  
    // If window falls below 400 (the height of the header)
    // the toTopOfPage button will appear
    if ($(window).scrollTop() >= 400) {
      $("#top-page").show();
    
      $("#top-page").on("click", function() {
        $(window).scrollTop(0);
      });
    } else {
      $("#top-page").hide();
    }
  });
};



$(() => {

  loadTweets();
  toTopOfPage();
  
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
  
  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'JSON'
    })
      .then((data) => {
        renderTweets(data);
      });
  }
    
  function loadNewTweet() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'JSON'
    })
      .then((data) => {
        renderTweets([data[data.length - 1]]);
      });
  }

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetPar)=> {

    const safeHTML = `<p class="text">${escape(tweetPar.content.text)}</p>`;

    let dateAdded = timeago.format(new Date());
    if (tweetPar.created_at) {
      dateAdded = timeago.format(tweetPar.created_at);
    }

    const $tweet = $(` <article class="article">
    <header class="tweet-header">
      <div id="profile-info">
        <img id="pp" src=${tweetPar.user.avatars}>
        <label for="img">${tweetPar.user.name}</label>
      </div>
      <span>${tweetPar.user.handle}</span>
    </header>
    <p class="tweet-card" type="text" placeholder="Tweet">${ safeHTML }</p>
    <footer>
      <output for="input">${ dateAdded }</output>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };
  $(".errMsg").hide();

  $('form').submit(function(event) {
    event.preventDefault();
    let serial = $(this).serialize();

    if (($(".counter").first().val() < 0)) {
      $(".counter").hide().fadeIn(6000);
      $(".errMsg").text(`Exeeded tweet character limit`).show('fast').fadeOut(1000);

    } else if ($("textarea").first().val() === '') {
      $(".counter").hide().fadeIn(6000);
      $(".errMsg").text(`Tweet Area EMPTY`).show().fadeOut(1000);
      
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serial
      })
        .then(() => {
          loadNewTweet();
        });
    }
  });
});