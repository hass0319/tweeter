/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  // function declarations
  const createTweetElement = (tweetData)=> {
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = escape(tweetData.content.text);
    let dateAdded = timeago.format(tweetData.created_at);

    const tweet = `
    <article class="article">
        <header class="tweet-header">
          <div id="profile-info">
            <img id="pp" src=${tweetData.user.avatars}>
            <p>${tweetData.user.name}</p>
          </div>
          <p>${tweetData.user.handle}</p>
        </header>
        <p class="tweet-card text">${ safeHTML }</p>
        <footer>
          <p>${ dateAdded }</p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
    </article>`;
    return tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const tweetEl = createTweetElement(tweet);
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $('.tweets-container').prepend(tweetEl);
    }
  };

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'JSON'
    }).then((data) => renderTweets(data));
  };
    
  const loadNewTweet = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'JSON'
    }).then((data) => renderTweets([data[data.length - 1]]));
  };

  const displayErrorMsg = function(msg) {
    $(".counter").hide();
    $(".errMsg").text(msg).show('fast').fadeOut(3000);
    setTimeout(() => {
      $(".counter").fadeIn(2000);
    }, 3000);
  };

  // Event Handlers
  $('form').submit(function(event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    const characterLimitExceeded =  $(".counter").first().val() < 0;
    const textareaIsEmpty = $("textarea").first().val() === '';

    if (characterLimitExceeded) {
      displayErrorMsg('Exeeded tweet character limit');
    } else if (textareaIsEmpty) {
      displayErrorMsg('Tweet Area EMPTY');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: serializedData
      }).then(() => {
        loadNewTweet();
        event.target.reset();
        $('.counter').text(140);
      });
    }
  });

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
  
  // run App
  loadTweets();
});