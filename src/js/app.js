var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
          const container = document.getElementById('posts-container');

          posts.forEach(post => {
              const card = document.createElement('div');
              card.classList.add('card');
              card.style.width = "18rem";
              card.innerHTML = `
                  <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                  </div>
                  <hr>
                  <p class="post-id">Post ID: ${post.id}</p>
              `;
              container.appendChild(card);
          });
      })
      .catch(error => console.error('Error fetching posts:', error));
});
