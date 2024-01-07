import { useState, useEffect } from 'react'
import './App.css';
import Gallery from './Components/Gallery';
import ButtonBar from './Components/ButtonBar';

function App() {
  let [data, setData] = useState({})
  let [objectId, setObjectId] = useState(12770)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
      const data = await response.json()
      setData(data)
    }

    fetchData()
  }, [objectId])

  const handleIterate = (e) => {
    setObjectId(objectId + Number(e.target.value))
  }

  const displayImage = () => {
    if(!data.primaryImage) {
      return (
        <h2>No Image!</h2>
      )
    }
    return (
      <Gallery objectImg={data.primaryImage} title={data.title} />
    )
  }

  return (
    <div className="App">
      <h1>{data.title}</h1>
      <div style={{'width': '100%'}}>
        {displayImage()}
      </div>
      <ButtonBar handleIterate={handleIterate} />
    </div>
  );
}

export default App