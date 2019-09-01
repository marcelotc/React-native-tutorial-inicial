import React, { Component } from 'react'
import { Keyboard, ActivityIndicator, Text, View, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'
 
import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles'

export default class Main extends Component {

    static navigationOptions = {
        title: 'Usuários'
    } 

    state = {
        newUser: '',
        users: [],
        loading: false
    }   

    async componentDidMount() { //busca os dados
        const users = await AsyncStorage.getItem('users');

        if (users) {
            this.setState({ users: JSON.parse(users) })
        }
        
    }               
    
    componentDidUpdate(_, prevState) { //executar quando houver alteração na variável users
        const { users } = this.state;

        if (prevState.users != users) {
            AsyncStorage.setItem("users", JSON.stringify(users));
        }
    }   
       
    handleAddUser = async () => {
        const { users, newUser } = this.state;

        this.setState({ loading: true })

        const response = await api.get(`/users/${newUser}`)

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        }

        this.setState({
            users: [...users, data],
            newUsers: '',
            loading: false
        })

        Keyboard.dismiss();

    } 
    
    handleNavigate = (user) => {
        const { navigation } = this.props;

        navigation.navigate('User', { user });
    }

    async clearStorage() {
        AsyncStorage.clear();
    }
         
    render() {
        const { users, newUser, loading } = this.state
     
        return (
            <>
                
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
                    <SubmitButton loading={loading} onPress={this.handleAddUser}>
                        {loading ? <ActivityIndicator color="#fff" />
                            : <Text style={{ color: 'white' }}>+</Text>/*<Icon name="add" size={20} color={"#fff"}></Icon>*/}
                    </SubmitButton>
  
                </Form>
   
                <List   
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={( {item} ) => (
                        <User>
                            <Avatar source={{ uri: item.avatar }}></Avatar>
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={ () => this.handleNavigate(item) }>
                                <ProfileButtonText> Ver perfil </ProfileButtonText>
                            </ProfileButton> 
                        </User>
                    )}
                />

                </Container>
                
                <View><Button onPress={this.clearStorage} title="Limpar"></Button></View>
                
            </>

        ) 
    }

} 

