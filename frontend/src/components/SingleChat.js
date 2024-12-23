import { FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Box, Text, Flex } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import { IoSend } from "react-icons/io5";
import { MdImage } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";

import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { imageUrls } from "../data/data";

// const ENDPOINT = "http://localhost:5000"; // -> Before deployment
const ENDPOINT = "https://coolchat-mern-1.onrender.com"; //  -> After deployment
var socket, selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [bgImage, setBgImage] = useState(imageUrls[0]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const changeBackgroundImage = () => {
    const currentIndex = imageUrls.indexOf(bgImage);
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    setBgImage(imageUrls[nextIndex]);
  };

  useEffect(() => {
    let isMounted = true;

    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
    if (isMounted) setSocketConnected(true);
  });
    socket.on("typing", (chatId) => {
      if (isMounted && selectedChatCompare && selectedChatCompare._id === chatId) {
        setIsTyping(true);
      }
    });
    socket.on("stop typing", (chatId) => {
      if (isMounted && selectedChatCompare && selectedChatCompare._id === chatId) {
        setIsTyping(false);
      }
    });

    return () => {
      isMounted = false; // Cleanup the flag on component unmount
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    setIsTyping(false);
    // eslint-disable-next-line
  }, [selectedChatCompare]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <Flex alignItems="center">
                    <Tooltip label="Change Wallpaper" aria-label="Change Background Tooltip">
                      <IconButton
                        icon={<MdImage />}
                        onClick={changeBackgroundImage}
                        aria-label="Change Background"
                        mr={2}
                        size="20px"
                        variant="ghost"
                      />
                    </Tooltip>
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                    />
                  </Flex>
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <Flex alignItems="center">
                    <Tooltip label="Change Wallpaper" aria-label="Change Background Tooltip">
                      <IconButton
                        icon={<MdImage />}
                        onClick={changeBackgroundImage}
                        aria-label="Change Background"
                        mr={2}
                        size="20px"
                        variant="ghost"
                      />
                    </Tooltip>
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                    />
                  </Flex>
                </>
              ))}
          </Flex>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bgImage={`url(${bgImage})`}
            bgSize="cover"
            bgPosition="center"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                color="#FFFFFF"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <InputGroup>
                <Input
                  variant="outline"
                  bg="#fff"
                  placeholder="Enter a message.."
                  _placeholder={{ color: 'gray.500' }}
                  value={newMessage}
                  onChange={typingHandler}
                  autoComplete="off"
                  focusBorderColor="transparent"
                  border="none"
                />
                <InputRightElement
                  pointerEvents="auto"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <IconButton
                    aria-label="Send message"
                    icon={<IoSend />}
                    onClick={sendMessage}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
