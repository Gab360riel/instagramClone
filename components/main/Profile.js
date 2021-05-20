import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import { connect } from 'react-redux';

function Profile(props) {
    const { currentUser, posts } = props;
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text>
                    {currentUser.name}
                </Text>
                <Text>
                    {currentUser.email}
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.imageView}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
        
    },

    infoContainer: {
        margin: 20
    },

    imageContainer: {
        flex: 1
    },

    imageView: {
        flex: 1/3,
        margin: 1
    },

    image: {
        flex: 1,
        aspectRatio: 1/1,
    }
})

const mapStateToProps = (store => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
}))

export default connect(mapStateToProps, null)(Profile);
