import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {CREATE_USER_MUTATION, SEND_MESSAGE_MUTATION} from './graphql';
import { User } from '../../server/src/generated/graphql'

interface CreateUserProps {
  setUserName: (value: string) => void;
}

const CreateUser = ({setUserName}: CreateUserProps) => {
  const [createUser] = useMutation<{createUser?: User}, { userName: string }>(
    CREATE_USER_MUTATION,
  );

  const [currentUsername, setCurrentUsername] = useState('')

  return (
    <View
      style={{
        borderColor: 'pink',
        borderWidth: 1,
        padding: 30,
      }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={setCurrentUsername}
            value={currentUsername}
            placeholder={'UserName'}
          />
          <Button
            title="Create User"
            color="#f194ff"
            onPress={async () => {
              const newUser = await createUser({variables: {userName: currentUsername}});
              
              if (newUser.data?.createUser?.userName) {
                setUserName(newUser.data.createUser.userName)
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateUser;
