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
    flex: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '10',
    marginBottom: '10',
  },
  container2: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '6%',
    marginBottom: '6%',
  },
  container3:{
    backgroundColor: '#d3d1d1',
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
  },
  TextA:{
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150, 
    height: 40, 
    borderRadius:20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  label: {
    marginRight: 10,
  }
});
const styles_menu = StyleSheet.create({
  circularItem: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#285C9B',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  //circularImageContainer: {
    //width: 80,            // Establece el ancho del contenedor circular en 100 unidades (píxeles o algún otro valor de medida).
    //height: 80,          // Establece la altura del contenedor circular en 100 unidades (píxeles u otra medida).
    //borderRadius: 50,     // Define un radio de borde de 50 unidades, lo que crea un contenedor circular.
    //overflow: 'hidden',   // Oculta cualquier contenido que se desborde del contenedor circular.
    //marginBottom: 10,     // Agrega un espacio en la parte inferior del contenedor circular de 10 unidades
  //},
  circularImage: {
    width: '40%', // Establece el ancho de la imagen al 100% del contenedor circular.
    height: '40%',// Establece la altura de la imagen al 100% del contenedor circular.
   // maxWidth: '80%', // Controla el ancho máximo de las imágenes
   // maxHeight: '80%', // Controla la altura máxima de las imágenes
    resizeMode: 'contain', // Configura cómo la imagen se ajusta dentro del contenedor. 'contain' permite que la imagen se ajuste dentro del contenedor sin distorsionarla.
  },
  itemTitle: {
    fontSize: 14, // Establece el tamaño de fuente del título en 16 unidades (píxeles u otra medida).
    color: 'white', // Define el color del texto del título como negro.
    marginTop: 5, // Agrega un espacio en la parte superior del título de 5 unidades.
    textAlign: 'center',  // Añade esta línea para centrar el texto
  },
  row: {
    flexDirection: 'row', // Configura el diseño de la vista para que los elementos estén en una fila horizontal.
    justifyContent: 'center', // Centra horizontalmente los elementos en la fila.
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  Image: {
    width: 225, // Ajusta el ancho de la imagen según tus necesidades
    height: 125, // Ajusta la altura de la imagen según tus necesidades
    borderRadius: 25, // Para hacer la imagen circular (ajusta según sea necesario)
    resizeMode: 'contain', // Ajusta la imagen al contenedor
    marginTop: 10,
  },
  Certificado:{
    width: 200, // Ajusta el ancho de la imagen según tus necesidades
    height: 125, // Ajusta la altura de la imagen según tus necesidades
    borderRadius: 25, // Para hacer la imagen circular (ajusta según sea necesario)
    resizeMode: 'contain', // Ajusta la imagen al contenedor
    marginTop: 10,
  }
 
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
const styles_settings = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
});
const styles_Horas = StyleSheet.create({
  Horas_Asesor: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  Horas_button: {
    backgroundColor: 'white',
  },
});
 
export {styles_log, styles_Principal, styles_Agendar, styles_menu, styles_Logout, styles_settings, styles_Horas};