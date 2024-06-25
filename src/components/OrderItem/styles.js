import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // container: {
    //     justifyContent: 'center', // center vertically
    //     alignItems: 'center', // center horizontally
    //   },
      orderContainer: {
        flexDirection: 'row',
        backgroundColor: '#726e6e',
        margin:10,
        borderRadius: 22,
        padding:10
      },
      txt:{
        color:'white',
        fontWeight:'bold', 
        fontSize:18,
      },
      detailsContainer: {
        flex: 1,
        marginRight:'auto',
        marginLeft:10
      },
      details: {
        flexDirection: 'row',
        marginVertical: 2,
      },
      thumbsUp: {
        backgroundColor: 'green',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        padding:15,
      },
      thumbsDown: {
        backgroundColor: '#e00d0d',
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        padding:15,
      },
})

export default styles;