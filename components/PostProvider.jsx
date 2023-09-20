"use client";
import { createContext, useState, useContext, useEffect } from "react";



// 1) CREATE A CONTEXT
const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/posts"); //get request
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;


  async function handleAddPost({ title, body }) {
    // console.log(title, body)
    try {
      const response = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,

          body,
        }),
      });

      if (!response.ok) {
        throw new Error("Error while sending data");
      }

      const savedPost = await response.json(); //converts json to js objects
      // console.log(savedPost)
      setPosts((currentPosts) => {
        // console.log("Current posts:", currentPosts); // Log the current state

        if (Array.isArray(currentPosts)) {
          return [savedPost, ...currentPosts];
        } else {
          console.error("currentPosts is not an array", currentPosts);
          return [savedPost]; // Fallback to just the new post
        }
      });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  }

    async function handleLearn(id) {
      try {
        const response = await fetch(`/api/posts`, {
          method: "PATCH",
          body: JSON.stringify({
            _id: id,
          }),
        });
        if (response.ok) {
          setPosts((prevPost) => {
            return prevPost.map((post) => {
              if (post._id === id) {
                return { ...post, learn: !post.learn };
              } else {
                return post;
              }
            });
          });
        } else {
          console.log("Failed to update post on server");
        }
      } catch (err) {
        console.log("Error on frontend while send patch request:", err.message);
      }
    }

      async function updateNote(id, title, body) {
        // console.log("id: " + id, "title: " + title, "content: " + body);
        try {
          //sending prompt data to server
          const response = await fetch(`/api/updatePost`, {
            method: "PATCH",
            body: JSON.stringify({
              _id: id,
              title: title,
              body: body,
            }),
          });
          if (response.ok) {
            // Update the local state
            setPosts((prevPost) => {
              return prevPost.map((post) => {
                if (post._id === id) {
                  return { ...post, title: title, body: body };
                } else {
                  return post;
                }
              });
            });
          } else {
            console.log("Failed to update post on server");
          }
        } catch (err) {
          console.log(
            "Error on frontend while send patch request:",
            err.message
          );
        }
      }

            async function handleDelete(id) {
              try {
                const response = await fetch(`/api/posts`, {
                  method: "DELETE",
                  body: JSON.stringify({
                    _id: id,
  
                  }),
                });
                if (response.ok) {
                  setPosts((prevPost) => {
                    return prevPost.filter((post) => post._id !== id);
                  });
                } else {
                  console.log("Failed to delete post on server");
                }
              } catch (err) {
                console.log(
                  "Error on frontend while send delete request:",
                  err.message
                );
              }
            }



  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        onLearn: handleLearn,
        searchQuery,
        setSearchQuery,
        onUpdate: updateNote,
        onDelete: handleDelete,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
