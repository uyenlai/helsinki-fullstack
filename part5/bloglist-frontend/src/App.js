import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedObject) => {
      setBlogs(blogs.concat(returnedObject));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    window.location.reload(false);
  };

  const BlogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          <label>
            {" "}
            Title
            <input value={newTitle} onChange={handleTitleChange} />
          </label>
        </div>
        <div>
          <lable>
            {" "}
            Author
            <input value={newAuthor} onChange={handleAuthorChange} />
          </lable>
        </div>
        <div>
          <label>Url</label>
          <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  const userBlogs = blogs.filter((blog) => blog.user !== user.id);
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <h2>Create new Blog</h2>
      <BlogForm />
      {userBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
