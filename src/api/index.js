import axios from 'axios'

// const URL  = "http://localhost:9000/posts"
// eslint-disable-next-line 
const URLOnline = "https://memoriesapi-av2t.onrender.com"
const API = axios.create({ baseURL: 'https://memoriesapi-av2t.onrender.com' })

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = (page)=> API.get(`/posts?page=${page}`)
export const fetchPost = (id)=> API.get(`/posts/${id}`)
export const createPost = (newPost)=> API.post('/posts', newPost)
export const updatePost = (id, updatedPost)=> API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id)=> API.delete(`/posts/${id}`)
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)
export const comment = (value,id)=> API.post(`/posts/${id}/commentPost`, {value})
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${ searchQuery.search || 'none' }&tags=${ searchQuery.tags }`)

export const signIn = (FormData) => API.post(`/user/signin`, FormData, {withCredentials:true})
export const signUp = (FormData) => API.post(`/user/signup`, FormData, {withCredentials:true})