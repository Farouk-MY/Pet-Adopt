import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { db } from '../../config/FirebaseConfig';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchChatDetails = async () => {
      const docRef = doc(db, 'Chat', id);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      const otherUser = result?.users?.find(item => item.email !== user?.primaryEmailAddress?.emailAddress);
      navigation.setOptions({
        headerTitle: otherUser?.name || 'Chat',
      });
    };

    fetchChatDetails();

    const messagesRef = collection(db, 'Chat', id, 'Messages');
    const orderedMessagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

    const unSubscribe = onSnapshot(orderedMessagesQuery, snapshot => {
      const messageData = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageData);
    });

    return () => unSubscribe();
  }, [id, navigation, user]);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const message = {
      ...newMessages[0],
      createdAt: new Date().toString('DD-MM-YYYY HH-mm-ss'),
    };
    await addDoc(collection(db, 'Chat', id, 'Messages'), message);
  }, [id]);

  const renderBubble = (props) => {
    const defaultProps = {
      wrapperStyle: {
        right: {
          backgroundColor: '#0078fe',
        },
        left: {
          backgroundColor: '#ececec',
        },
      },
      textStyle: {
        right: {
          color: '#fff',
        },
        left: {
          color: '#000',
        },
      },
    };
    return <Bubble {...{ ...defaultProps, ...props }} />;
  };

  const renderInputToolbar = (props) => {
    const defaultProps = {
      containerStyle: {
        borderTopWidth: 1,
        borderTopColor: '#ececec',
        padding: 5,
      },
      primaryStyle: { alignItems: 'center' },
    };
    return <InputToolbar {...{ ...defaultProps, ...props }} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl
      }}
      showUserAvatar={true}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
    />
  );
}
