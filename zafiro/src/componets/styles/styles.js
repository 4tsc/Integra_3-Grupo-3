import { StyleSheet, StatusBar } from "react-native";

const styles_log = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0085FF',
        marginTop: StatusBar.currentHeight
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

const styles_Eliminar = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  appointmentItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});
export {styles_log, styles_Principal, styles_Agendar, styles_Eliminar};