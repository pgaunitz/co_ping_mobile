import axios from "axios"
import { SIGN_UP } from "../state/actions/actionTypes"

const sendCommunityCode = async (code, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))
  let response = await axios.get(
    'https://co-ping.herokuapp.com/communities/',
    {
      q: code
    },
    {
      headers: headers,
    }
  )
  debugger
  dispatch({
    type: SIGN_UP,
    payload: {
      communityId: response.data.community_id
    },
  })
}