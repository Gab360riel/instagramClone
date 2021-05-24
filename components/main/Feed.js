import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Dimensions } from 'react-native';

import { connect } from 'react-redux';

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if(props.usersLoaded == props.following.length){
            for(let i = 0; i < props.following.length; i++){
                const user = props.users.find(el => el.uid === props.following[i]);
                if(user != undefined && user.posts !== undefined){
                    posts = [...posts, ...user.posts]; //error
                }
            }

            posts.sort(function(x, y){
                return x.creation - y.creation;
            })

            setPosts(posts);
        }
    }, [props.usersLoaded])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => 
                        (
                        <View style={styles.imageView}>
                            <Text style={styles.text}>{item.user.name}</Text>
                            <Image
                            style={styles.image}
                            source={{uri: item.downloadURL}}
                        />
                        </View>
                    )}
                
                />
            </View>
        </View>
    )
}

const win = Dimensions.get('window');
const ratio = win.width/885; //885 is actual image width


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0
    },

    imageContainer: {
        flex: 1,
    },

    imageView: {
        flex: 1,
    },

    text: {
        marginTop: 20
    },
    
    image: {
        flex: 1,
        aspectRatio: 1/1,
        width: win.width,
        height: 885 * ratio,
    }
})

const mapStateToProps = ((store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded

}))

export default connect(mapStateToProps, null)(Feed);
