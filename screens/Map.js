import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('screen');

const parkings = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 4.2,
        spots: 20,
        free: 10,
        location: {
            lat: 37.78835,
            lng: -122.4324,
        }
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 5,
        rating: 4.0,
        spots: 50,
        free: 25,
        location: {
            lat: 37.78825,
            lng: -122.4324,
        }
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 5,
        rating: 2.2,
        spots: 10,
        free: 2,
        location: {
            lat: 37.78855,
            lng: -122.4324,
        }
    },
];

class Map extends Component {

    state = {
        hours: []
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        )
    }

    renderParking = (item) => {

        const { hours } = this.state

        return (
            <View key={`parking-${item.id}`} style={styles.parking}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 16}}>x {item.spots} {item.title}</Text>
                <View style={{ width: 100, borderRadius: 6, borderColor: 'grey', borderWidth: 0.5, padding: 4}}>
                    <Text style={{fontSize: 16}}>5:00 hrs</Text>
                </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text>${item.price}</Text>
                        <Text>{item.rating}</Text>
                    </View>
                    <TouchableOpacity style={styles.buy}>
                        <View>
                            <View style={{flex: 1, justifyContent: 'center',}}>
                                <Text style={{fontSize: 24, color: 'white'}}>${item.price * 2}</Text>
                                <Text style={{color: 'white'}}>{item.price}x{hours[item.id]}hrs</Text>
                            </View>
                            <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 24, color: 'white'}}>></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderParkings = () => {
        return (
            <ScrollView 
                centerContent
                horizontal 
                // onScrollEndDrag={}
                pagingEnabled
                scrollEnabled
                scrollEventThrottle={16}
                snapToAlignment={'center'}
                showsHorizontalScrollIndicator={false}
                style={styles.parkings}
            >
                {parkings.map(parking => this.renderParking(parking))}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView 
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                />
                {this.renderParkings()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buy: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'red',
        borderRadius: 6,
        padding: 12
    },  
    header: {
        flex: .5,
        justifyContent: 'center'
    },
    map: {
        flex: 3,
    },
    parkings: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 24,
    },
    parking: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24,
        width: width - (24 * 2),
    }
})

export default Map;