let nextId = 1; // initialize nextId variable

// Function to add a post to the array and update the UI
export function addPost(post, posts) {
  const existingPost = posts.find((p) => p.id === post.id); // find existing post by id
  if (existingPost) {
    Object.assign(existingPost, post); // update existing post with new data
  } else {
    post.id = nextId++; // add new id to new post
    posts.push(post); // add new post to array
  }
  localStorage.setItem("posts", JSON.stringify(posts));
  update(posts);
}

// Function to remove a post from the array and update the UI
export function removePost(index, posts) {
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  update(posts);
}

// Function to update the UI with the current posts
export function update(posts) {
  const list = document.getElementById("list");
  list.innerHTML = "";
  if (posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const li = document.createElement("li");
      const title = document.createElement("h2");
      const date = document.createElement("p");
      const summary = document.createElement("p");

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML =
        '<i class = "fa fa-trash" aria-hidden="true"></i> Delete';

      const editButton = document.createElement("button");
      editButton.innerHTML =
        '<i class = "fa fa-pencil" aria-hidden="true"></i> Edit';

      title.innerText = post.title;
      date.innerText = post.date;
      summary.innerText = post.summary;
      deleteButton.addEventListener("click", () => {
        removePost(i, posts);
      });
      editButton.addEventListener("click", () => {
        // Fill in form fields with current post data
        document.getElementById("title").value = post.title;
        document.getElementById("date").value = post.date;
        document.getElementById("summary").value = post.summary;
        // Show form dialog
        dialog.showModal();
        // Set the post id as a data attribute on the form
        form.setAttribute("data-post-id", post.id);
      });

      li.appendChild(title);
      li.appendChild(date);
      li.appendChild(summary);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      list.appendChild(li);
    }
    document.getElementById("emptyList").style.display = "none";
  } else {
    document.getElementById("emptyList").style.display = "block";
  }
}
