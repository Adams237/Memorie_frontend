import * as api from '../api'



export const getPost = (id)=>async(dispach)=>{


    try {
        dispach({ type: "START_LOADING" })
        const {data} = await api.fetchPost(id)
        dispach({type: 'FETCH_POST', payload: data})
        dispach({ type: "END_LOADING" })
    } catch (error) {
        console.log(error.message);
    }

   
}
export const getPosts = (page)=>async(dispach)=>{


    try {
        dispach({ type: "START_LOADING" })
        const {data} = await api.fetchPosts(page)
        dispach({type: 'FETCH_ALL', payload: data})
        dispach({ type: "END_LOADING" })
    } catch (error) {
        console.log(error.message);
    }

   
}


export const getPostsBySearch = ( searchQuery )=> async (dispach)=>{
    try {
        dispach({ type: "START_LOADING" })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        dispach({type: 'FETCH_BY_SEARCH', payload: data})
        dispach({ type: "END_LOADING" })
    } catch (error) {
        console.log(error);
    }
}


export const createPost = (post, history) => async (dispach) => {
    try {
        dispach({ type: "START_LOADING" })
        const {data} = await api.createPost(post)
        history.push(`/posts/${data._id}`)
        dispach({type: 'CREATE', payload: data})
        dispach({ type: "END_LOADING" })
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost =(id, post)=> async(dispach)=>{
    try {
        const {data} =  await api.updatePost(id, post)
        dispach({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
 

export const deletePost = (id) => async (dispach)=>{
    try {
        await api.deletePost(id)
        dispach({type: 'DELETE', payload: id})
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id)=> async(dispach)=>{
    try {
        const { data } = await api.likePost(id)
        dispach({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const commentPost =(value, id)=> async(dispach)=>{
    try {
        const {data} = await api.comment(value, id)
        
        dispach({ type: 'COMMENT', payload: data })
        return data.comments
    } catch (error) {
        console.log(error);
    }
}