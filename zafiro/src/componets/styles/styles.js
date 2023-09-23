import { StyleSheet, Dimensions } from "react-native";

//probando
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageWidthPercentage = 30;
const imageHeightPercentage = 10;
const styles_log = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196f3',
      },
      container2: {
        flex: 1,
        alignItems: 'center',
        top: '10%',
      },
      container3: {
        alignItems: 'center',
        flex: 1,
        top: "5%",
      },
      container4:{
        alignItems: 'center',
        flex: 1,
        top: '-3%',
      },
      container5:{
        alignItems: 'center',
        flex: 1,
        bottom: '10%'
      },
      texto1:{
    
      },
      texto2:{
    
      },
      texto3:{
        alignItems: 'center',
        top: '-27%'
      },
      testo:{
        color: '#FFF',
        fontSize: 12
      },
      input: {
        width: 264,
        height: 49,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 70,
        textAlign: 'center',
      },
      btn: {
        backgroundColor:'#FAB700',
        borderRadius: 100,
        height:48,
        width:144,
        alignItems: 'center',
        justifyContent: 'center',
      },
      btnText: {
        color: 'black',
        fontWeight: 'bold',
      },
      image: {
        width: 100,
        height: 93,
        resizeMode: 'contain',
      },
})
const styles_Principal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0085FF',
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
})

const styles_Agendar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
  selectedDateTime: {
    marginTop: 10,
    fontSize: 16,
  },
  advisorPicker: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
  advisorButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
const styles_menu = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2196f3',
    width: windowWidth, // Ancho igual al ancho de la pantalla
    height: windowHeight, // Altura igual a la altura de la pantalla
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    margin: 10,
    height: '100%',
    borderRadius: '200px',
    width: '30%',
  },
  flat: {
    height: '100%',
  },
  image: {
    aspectRatio: 1,
    width: (windowWidth * imageWidthPercentage) / 100, // Calcula el ancho según el porcentaje
    height: (windowHeight* imageHeightPercentage)/100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    
    
  },
});

const styles_Logout = StyleSheet.create({
    container:{
        flex: 1, // Utiliza flex para ocupar todo el espacio vertical
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        width: windowWidth, // Ancho igual al ancho de la pantalla
        height: windowHeight, // Altura igual a la altura de la pantalla
        // backgroundColor: '#2196f3', // Puedes ajustar el color de fondo según tus preferencias
      },
      button: {
        backgroundColor: '#00BBE0',
        padding: 10,
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },

})
export {styles_log, styles_Principal, styles_Agendar, styles_menu, styles_Logout};