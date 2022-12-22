import jsonPlaceHolder from "../apis/jsonPlaceHolder";
import _ from 'lodash';

//Bad Approach
// export const fetchPosts =async ()=>{

//     //Bad Bad Approach -We will see this error 
//     const response=await jsonPlaceHolder.get('/post');
//     return{
//         type:'FETCH_POST',
//         payload:response
//     };
// };

export const fetchPostAndUsers =()=>async (dispatch,getState) =>{
    await dispatch(fetchPosts());
    
    // const userIds=_.uniq(_.map(getState().posts,'userId'));
    // userIds.forEach(id =>dispatch(fetchUser(id)));


    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

//Please refer video No. 259
export const fetchPosts =()=>async dispatch =>{

    const response=await jsonPlaceHolder.get('/posts');
    
    dispatch({type:'FETCH_POST',payload:response.data})
};


export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceHolder.get(`/users/${id}`);
  
    dispatch({ type: 'FETCH_USER', payload: response.data });
};


//Using memoize-lecture-280
// export const fetchUser = id => dispatch => _fetchUSer(id,dispatch);

//     const _fetchUSer = _.memoize(async(id,dispatch)=>{
//         const response = await jsonPlaceHolder.get(`/users/${id}`);
//         dispatch({ type: 'FETCH_USER', payload: response.data });
//     });