import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { getUserObject } from "../services/authService";
import { getCancelToken } from "../services/httpService";
import { getAccount, updateUserEvents } from "../services/userService";
import { eventsReducer } from "./UserDataReducers";

const UserEventsContext = createContext();
const UserImagesContext = createContext();

const UserDataContextProvider = (props) => {
  const { currentUser, isAuth } = useAuth();

  //if something wrong, uncomment
  // const [ currentUser, setCurrentUser ] = useState(getUserObject());
  // useEffect(()=>{
  //   console.log(user);
  //     setCurrentUser(user);
  // },[user]);

  const [eventsState, dispatchEvent] = useReducer(eventsReducer, {
    status: "init",
    events: [],
  });

  useEffect(() => {
    let isMounted = true;
    const source = getCancelToken(); // we need to cancel the request if user the component unmounts.

    dispatchEvent({ type: "requesting" });

    async function requestUserData() {
      try {
        let currentUser = getUserObject();
        console.log(currentUser);
        if (!isMounted) return;
        if (!currentUser || typeof currentUser === "undefined")
          throw new Error("no token"); // setStatus('invalid token');
        else if (isAuth) {
          currentUser = await getAccount();
          //   currentUser = await getUser(currentUser, { cancelToken: source.token })
        }

        if (isMounted) {
          console.log(currentUser.data);
          dispatchEvent({ type: "received", payLoad: currentUser.data.events });
        }
      } catch (ex) {
        dispatchEvent({ type: "error", payLoad: ex });

        return;
      }
    }
    requestUserData();
    return () => {
      isMounted = false;
      source.cancel("canceled");
    };
  }, [currentUser]);

  const updateDataBase = useCallback(async (data) => {
    console.log(data);
    try {
      let response;
      let currentUser = getUserObject(); //user from token
      if (!currentUser || typeof currentUser === "undefined")
        throw new Error("Invalid User");

      response = await updateUserEvents(currentUser, data);
    } catch (err) {
      const error = err?.response?.data ? err?.response?.data : err;
      console.log(error);
      throw new Error(error);
    }
  }, []);

  const handleSaveEvent = useCallback(
    async (event) => {
      dispatchEvent({ type: "save", payLoad: event });
      console.log(eventsState);
      const newEvents = !eventsState.events.some((i) => i._id === event?._id)
        ? [...eventsState.events, event]
        : [...eventsState.events];
      try {
        await updateDataBase(newEvents);
      } catch (error) {
        dispatchEvent({ type: "unsave", payLoad: event });
        // dispatchEvent({ type: 'error', payLoad: error })
      }
    },
    [eventsState.events, updateDataBase]
  );

  const handleUnsaveEvent = useCallback(
    async (recipe) => {
      dispatchEvent({ type: "unsave", payLoad: recipe });
      const newEvents = eventsState.events.filter((i) => i._id !== recipe?._id);
      try {
        await updateDataBase(newEvents);
      } catch (error) {
        dispatchEvent({ type: "save", payLoad: recipe });
      }
    },
    [eventsState.events, updateDataBase]
  );

  const eventsObj = {
    events: {
      status: eventsState.status,
      errorMsg: eventsState.errorMsg,
      events: eventsState.events,
      save: handleSaveEvent,
      unsave: handleUnsaveEvent,
    },
  };

  //imagesObj------------------------------------------------------------
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  //handleClose, photo, setPhoto, show
  const imagesObj = {
    images: {
      handleShow: handleShowModal,
      handleClose: handleCloseModal,
      photo: photo,
      setPhoto: setPhoto,
      show: showModal,
      setShow: setShowModal,
      arrayBufferToBase64: arrayBufferToBase64,
    },
  };
  return (
    <UserEventsContext.Provider value={eventsObj}>
      <UserImagesContext.Provider value={imagesObj}>
        {props.children}
      </UserImagesContext.Provider>
    </UserEventsContext.Provider>
  );
};

export const useUserEventsContext = () => {
  const context = useContext(UserEventsContext);
  if (context === undefined) {
    throw new Error(`use in tree : ContextProvider`);
  }
  return context;
};
export const useUserImagesContext = () => {
  const context = useContext(UserImagesContext);
  if (context === undefined) {
    throw new Error(`use in tree : ContextProvider`);
  }
  return context;
};

export default UserDataContextProvider;
