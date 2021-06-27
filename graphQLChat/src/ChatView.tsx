import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';
import {useQuery, useMutation, useSubscription} from '@apollo/react-hooks';
import {
  CHATS_QUERY,
  SEND_MESSAGE_MUTATION,
  MESSAGE_SENT_SUBSCRIPTION,
} from './graphql';
import { Chat } from '../../server/src/generated/graphql'

const ChatView = () => {
  const [value, onChangeText] = useState('');
  const [userName, onChangeUserName] = useState('');
  const [messages, setMessages] = useState<Chat[]>([]);

  const {data: initialData, loading: initialLoading} = useQuery<{ chats: Chat[]}>(CHATS_QUERY);
  const [sendMessage] = useMutation<Chat>(SEND_MESSAGE_MUTATION);
  const {data: newData} = useSubscription<{messageSent: Chat}>(MESSAGE_SENT_SUBSCRIPTION);

  useEffect(() => {
    if (initialData) {
      setMessages([...initialData.chats]);
    }
  }, [initialData]);

  useEffect(() => {
    if (newData && !messages.length) {
      setMessages([newData.messageSent]);
    } else if (
      newData &&
      newData?.messageSent?.id !== messages[messages.length - 1]?.id
    ) {
      setMessages([...messages, newData.messageSent]);
    }
  }, [messages, newData]);

  if (initialLoading && initialData === undefined) {
    return <View />;
  }

  return (
    <View
      style={{
        borderColor: 'pink',
        borderWidth: 1,
        padding: 30,
      }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {messages.map(item => (
            <>
              <Text style={{fontWeight: 'bold'}}>from: {item.from}</Text>
              <Text>{item.message}</Text>
            </>
          ))}
        </ScrollView>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => onChangeUserName(text)}
            value={userName}
            placeholder={'UserName'}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder={'Message'}
          />
          <Button
            title="Press me"
            color="#f194ff"
            onPress={() => {
              console.log(value);
              sendMessage({variables: {from: userName, message: value}});
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default ChatView;
