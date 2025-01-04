import { useCallback, useEffect, useReducer, useState } from "react"
import { useFetch } from "."

function postReducer(state, action) {
    
    if (action.type === 'FETCHING') {
        return { ...state, fetching: true, error: null, seeMore: false, isEmptyData: false }
    }

    if (action.type === 'FETCH_ERROR') {
        return { ...state, fetching: false, error: action.payload, seeMore: false, isEmptyData: false }
    }

    if (action.type === 'ADD_POSTS') {
        return {
            ...state,
            fetching: false,
            error: null,
            seeMore: false,
            isEmptyData: false,
            posts: [...state.posts, ...action.payload]
        }
    }

    if (action.type === 'FETCH_EMPTY') {
        return { ...state, fetching: false, error: null, seeMore: false, isEmptyData: true }
    }

    if (action.type === 'GET_NEXT_POSTS') {
        return { ...state, seeMore: true }
    }

    if (action.type === 'ADD_NEW_POST') {
        return { ...state, posts: [action.payload, ...state.posts] }
    }

    return state
    
}

export function usePost() {

    const [page, setPage] = useState(1)
    const [state, dispatch] = useReducer(postReducer, {
        fetching: false,
        error: null,
        posts: [],
        seeMore: false,
        isEmptyData: false
    })

    const fetchUrl = new URL('https://jsonplaceholder.typicode.com/posts?_limit=3&_page=1')
    fetchUrl.searchParams.set('_page', page)
    const {isLoading, data, isError} = useFetch(fetchUrl.toString())

    useEffect(() => {
        if (isLoading) {
            dispatch({type: 'FETCHING'})
        } else if (isError) {
            dispatch({type: 'FETCH_ERROR', payload: isError})
        } else if (data && data.length > 0) {
            dispatch({type: 'ADD_POSTS', payload: data})
        } else if (data && data.length === 0) {
            dispatch({type: 'FETCH_EMPTY'})
        }
    }, [isLoading, data[0]?.id, isError])

    useEffect(() => {
        if (state.seeMore) {
            setPage(page + 1)
        }
    }, [state.seeMore])

    return {
        posts: state.posts,
        isLoading: state.fetching,
        isError: state.error,
        seeMore: state.seeMore,
        isEmptyData: state.isEmptyData,
        getNextPosts: useCallback(() => dispatch({type: 'GET_NEXT_POSTS'}), []),
        addNewPost: useCallback((post) => dispatch({type: 'ADD_NEW_POST', payload: post}), [])
    }

}
