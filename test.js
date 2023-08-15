import axios from "axios";


// get
console.log("********* GET ************")

const resp = await axios.get('https://httpbin.org/get');
console.log(resp.data);

// post
console.log("********* POST ************")
const formdata = {
    title: 'New Post Title',
    body: 'This is the body of the new post.',
    userId: 1
};

const resp20 = await axios.post('https://httpbin.org/post', formdata);

console.log(resp20.data);

// Put
console.log("********* PUT ************")

const updatedPost = {
    id: 1,
    title: 'Updated Post Title',
    body: 'This is the updated body of the post.',
    userId: 1
  };
const putResponse = await axios.put('https://jsonplaceholder.typicode.com/posts/1', updatedPost);
console.log('PUT Response:', putResponse.data);

// DELETE Request
console.log("********* PUT ************")
const deleteResponse = await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
console.log('DELETE Response:', deleteResponse.data);

