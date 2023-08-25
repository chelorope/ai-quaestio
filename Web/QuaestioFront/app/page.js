// import Image from 'next/image'
import axios from 'axios';

export default function Home() {
  // const setFile = (event) => {
  //   console.log(event.target.files[0]);
  //   const response = await axios.post('http://localhost:5000/upload', event.target.files[0]);
  //   console.log("RESPONSE", response);
  // }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form method='POST' encType='multipart/form-data' action="http://localhost:5050/open-questionaire">
        <input type='file' name='uploaded_file' accept='.qml'/>
        <button type='submit'>Upload</button>
      </form>
    </main>
  )
}
