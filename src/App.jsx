import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: ""
  });

  const generateId = () => Date.now();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox" && name === "tags") {
      setFormData(prevState => {
        const updatedTags = checked ? [...prevState.tags, value] : prevState.tags.filter((curTag) => curTag !== value);

        return {
          ...prevState,
          tags: updatedTags,
        };
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).every(value => value !== "" && value !== null)) {
      const newPost = {
        id: generateId(),
        ...formData,
      };
      setPosts([...posts, newPost]);
      setFormData({
        title: "",
        content: "",
        image: "",
      });
    };
  };

  const handleDelete = (id) => {
    axios.delete()
    const newPosts = posts.filter((curPost) => curPost.id !== id);
    setPosts(newPosts);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/posts').then(resp => {
      console.log(resp.data)
    });
});

  return (
    <>
      <header className="bg-info text-center mb-3">
        <h1>I miei fantastici Post</h1>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="title" className='me-4'>Titolo:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="content" className='me-4'>Descrizione:</label>
            <input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="image" className='me-4'>Immagine (URL):</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange} />
          </div>

          <button type='submit' className='btn btn-success'>Aggiungi Post</button>
        </form>
        <div className="row mt-5">
          <div className="col d-flex justify-content-between flex-wrap row-gap-4">

            {posts.length > 0 ?
              posts.filter((curPost) => curPost.id).map((curPost) => (
                <div className='card' key={curPost.id}>
                  <div className='card-body'>
                    <h4 className='card-title'>{curPost.title}</h4>
                    <p className='card-text'>{curPost.content}</p>
                    {curPost.postImage && <img src={curPost.image} alt={curPost.postName} />}
                    <p><strong>Contenuto:</strong> {curPost.postContent}</p>
                    <p><strong>Categoria:</strong> {curPost.postCategory}</p>
                    <p><strong>Pubblicato:</strong></p>
                    <p><strong>Tags:</strong> {curPost.tags.join(", ")}</p>
                    <button onClick={() => handleDelete(curPost.id)}>🗑️</button>
                  </div>
                </div>

              )) : (
                <p className='fs-3'>Non ci sono post</p>
              )
            }

          </div>
        </div>

      </div>
    </>
  );
};

export default App
