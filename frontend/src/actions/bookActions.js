import axios from "axios"
import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
} from "../constants/bookConstants"

export const listBooks =
  (keyword = "") =>

  async dispatch => {
    try {
      dispatch({ type: BOOK_LIST_REQUEST })
      const { data } = await axios.get(`/api/books?search=${keyword}`)
      dispatch({
        type: BOOK_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOK_LIST_FAIL,
        // sending the Backend Error message to frontend
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listBookDetails = id => async dispatch => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/books/${id}`)
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createBook = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/books/`, {}, config)
    console.log("sample book created", data)
    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBook = book => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/books/${book._id}`, book, config)

    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
