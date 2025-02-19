document.addEventListener('DOMContentLoaded', () => {
     fetchData();
    
     document.getElementById('search').addEventListener('input', filterPosts);
    });
    async function fetchData() {
     try {
     showLoading(true);
     const usersResponse = await
    fetch('https://jsonplaceholder.typicode.com/users');
     const postsResponse = await
    fetch('https://jsonplaceholder.typicode.com/posts');
     const users = await usersResponse.json();
     const posts = await postsResponse.json();
     displayUsers(users);
     displayPosts(posts);
 } catch (error) {
 console.error('Error fetching data:', error);
 } finally {
 showLoading(false);
 }
}
function displayUsers(users) {
 const usersContainer = document.getElementById('users');
 usersContainer.innerHTML = '';
 users.forEach(user => {
 const userElement = document.createElement('div');
 userElement.classList.add('user');
 const userName = document.createElement('h2');
 userName.textContent = user.name;
 const userEmail = document.createElement('p');
 userEmail.textContent = `Email: ${user.email}`;
 userElement.appendChild(userName);
 userElement.appendChild(userEmail);
 usersContainer.appendChild(userElement);
 });
}
function displayPosts(posts) {
 const postsContainer = document.getElementById('posts');
 postsContainer.innerHTML = '';
 posts.forEach(post => {
 const postElement = document.createElement('div');
 postElement.classList.add('post');
 postElement.dataset.title = post.title.toLowerCase();
 const postTitle = document.createElement('h2');
 postTitle.textContent = post.title;
 const postBody = document.createElement('p');
 postBody.textContent = post.body;
 postElement.appendChild(postTitle);
 postElement.appendChild(postBody);
 postsContainer.appendChild(postElement);
});
}
function filterPosts() {
 const query = document.getElementById('search').value.toLowerCase();
 const posts = document.querySelectorAll('.post');
 posts.forEach(post => {
 const title = post.dataset.title;
 if (title.includes(query)) {
 post.style.display = 'block';
 } else {
 post.style.display = 'none';
 }
 });
}
function showLoading(isLoading) {
 const loading = document.getElementById('loading');
 loading.style.display = isLoading ? 'block' : 'none';
}