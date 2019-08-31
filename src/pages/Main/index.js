import React, { Component } from 'react'
import { Keyboard, Button, View, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles'
import { FlatList } from 'react-native-gesture-handler';

export default class Main extends Component {
    state = {
        newUser: '',
        users: [],
        dogs: []

    } 
 
    handleAddUser = async () => {
        const { users, newUser } = this.state;

        const response = await api.get(`/users/${newUser}`)

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        }

        this.setState({
            users: [...users, data],
            newUsers: ''
        })

        Keyboard.dismiss();

    } 

    geraDogs = async () => {
        const { dogs } = this.state;

        const responseDogs = await api.get('https://dog.ceo/api/breeds/image/random')

        const data = {
            dogImg: responseDogs.data.message,
        }
 
       this.setState({
            dogs: [...dogs, data],
        })

    }   
 
    render() {
        const { users, newUser, dogs } = this.state
     
        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="adicionar usuário"
                        value={newUser}
                        onChangeText={text => this.setState({ newUser: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUser}
                    ></Input>
                    <SubmitButton onPress={this.handleAddUser}>
                        <Icon name="add" size={20} color={"#fff"}></Icon>
                    </SubmitButton>

                </Form>
 
                <Button onPress={this.geraDogs} title="Geraa Dogs"
                    style={{color: 'blue', fontSize: 30,}}
                ></Button>
                
                <FlatList
                    data={dogs}
                    keyExtractor={dog => dog.dogImg}
                    renderItem={({ item }) => (
                        <View>
                            <Avatar source={{ uri: item.dogImg }}></Avatar>
                        </View> 
                    )}
                ></FlatList>       
      
                <List   
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={( {item} ) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }}></Avatar>
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => { }}>
                                <ProfileButtonText>Ver perfil </ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />

            </Container> 


        )
    }

} 

Main.navigationOptions = {
    title: 'Usuários',
}               