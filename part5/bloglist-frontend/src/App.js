import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Error from "./components/Error";
import Success from "./components/Success";
import CreateNewBlogForm from "./components/CreateNewBlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [createNewVisible, setCreateNewVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setError("Wrong username or password");
      setTimeout(() => {
        setError(null);
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
      setSuccess(
        `A new blog ${returnedObject.title} by ${returnedObject.author} added`
      );
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
      setCreateNewVisible(false);
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

  const createNewBlogForm = () => {
    const hideWhenVisible = { display: createNewVisible ? "none" : "" };
    const showWhenVisible = { display: createNewVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateNewVisible(true)}>New Blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateNewBlogForm
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
          />
          <button onClick={(e) => { addBlog(e); setCreateNewVisible(false); }}>Create</button>
          <button style={{ marginBottom: 20 }} onClick={() => setCreateNewVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }
    const handleLogout = () => {
      window.localStorage.removeItem("loggedUser");
      window.location.reload(false);
    };

    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <Error message={error} />
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
        <Success message={success} />
        <p>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </p>
        {createNewBlogForm()}
        {userBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };
export default App;
