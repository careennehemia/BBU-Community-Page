
document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
  
    fetch("data/posts.json")
      .then((response) => response.json())
      .then((postsData) => {
        // Fetches the users
        fetch("data/users.json")
          .then((response) => response.json())
          .then((usersData) => {
            postsData.sort((a, b) => new Date(b.date) - new Date(a.date)); //sorts by date
  
            postsData.forEach((post) => {
                //matches the ids
              const user = usersData.find((u) => u.id === post.id);

            //   creates a container to hold the post 
              const postEl = document.createElement("div");
              postEl.classList.add("post");
  
              // Creates a profile image
              const userImg = document.createElement("img");
              userImg.classList.add("profile-img");
              userImg.src = `photos/${user.profile_photo}`;
              userImg.alt = user.username;
  
              // Creates a container for user info
              const userInfoEl = document.createElement("div");
              userInfoEl.classList.add("user-info");
  
              const usernameEl = document.createElement("h3"); //adds username
              usernameEl.textContent = user.username;
  
              const dateEl = document.createElement("span"); //adds date
              dateEl.classList.add("post-date");
              dateEl.textContent = formatDate(post.date);
  
              userInfoEl.appendChild(usernameEl); // adds date and username to userinfo
              userInfoEl.appendChild(dateEl);
  
              const contentEl = document.createElement("p"); //carries user message
              contentEl.classList.add("post-content");
              contentEl.textContent = post.content;
  
              postEl.appendChild(userImg); // appends everything to post container
              postEl.appendChild(userInfoEl);
              postEl.appendChild(contentEl);
  
              postsContainer.appendChild(postEl); //appends to main container
            });
          })
          .catch((error) => {
            console.error("Error fetching users.json:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching posts.json:", error);
      });
  });
  
//formats the date 
  function formatDate(dateStr) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }
  