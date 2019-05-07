import React, { Component } from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Icon, Text, Button, Item } from "native-base";
import TextField from "../TextFieldMaterialDesign";

// libreria iconos personalizados
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../../../selection.json";
import ValidationComponent from "react-native-form-validator";

///
import DatePickerComponent from "../../../helpers/components/DatePickerComponent";

const Linericon = createIconSetFromIcoMoon(
  icoMoonConfig,
  "icomoon",
  "icomoon.ttf"
);
export default class ButtonAddPay extends ValidationComponent {
  constructor(props) {
    super(props);
  }
  state = {
    title: this.props.title,
    isValidFechaDesde: false,
    errorFechaDesde: [],
    fechaDesde: "",
    fechaHasta: "",
    changeDate: false
  };
  //Envia  el estado actual de las fechas al compoenente padre
  onPressFilter = () => {
    this.props.onPressFilter(this.state.fechaDesde, this.state.fechaHasta);
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
      >
        <TouchableOpacity
          onPress={() => this.props.closeModal()}
          style={styles.backShadow}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.cardShadow, styles.container]}
          >
            <Text style={styles.title}>PERIODO</Text>
            <DatePickerComponent
              onDateChange={
                function(fechaDesde) {
                  this.setState({ fechaDesde });
                }
                //se recibe la fecha del componente DatePickerComponente
                //se actualiza el estado de este componente
              }
              //El componente DatePickerComponent cambia su valor debido a que se envia el estado fecha de este componente
              mainDate={this.state.fechaDesde}
            />
            <DatePickerComponent
              onDateChange={fechaHasta => this.setState({ fechaHasta })}
              mainDate={this.state.fechaHasta}
            />
            <View style={styles.ButtonWrapper}>
              <TouchableOpacity
                onPress={() => this.props.closeModal()}
                style={{ flex: 1, alignItems: "flex-start" }}
              >
                <Text style={styles.cancelButton}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onPressFilter}
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <Text style={styles.enviarButton}>FILTRAR</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  getTextField2() {
    return (
      <TextField
        duration={2000}
        icon={
          <Linericon name="outline-today-24px" style={styles.iconTextField} />
        }
        isActiveTouch={false}
        widthTextField={"100%"}
        //isValid={}
        errors={[]}
        label={"DD/MM/AAAA"}
        tooltip="Peridodo hasta"
        onChangeText={fechaHasta => {
          this.setState({ fechaHasta });
        }}
        value={this.state.fechaHasta}
        returnKeyType={"next"}
      />
    );
  }
}

const styles = StyleSheet.create({
  backShadow: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "85%",
    height: 330,
    backgroundColor: "white",
    borderRadius: 4
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 16,
    letterSpacing: 0.5,
    color: "rgba(0, 0, 0, 0.87)",
    padding: "5%"
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.5,
    color: "rgba(0, 0, 0, 0.87)",
    marginHorizontal: "5%"
  },
  ButtonContianer: {
    borderTopWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.54)",
    marginTop: 50
  },
  ButtonWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderColor: "#c1c0c0"
  },
  cancelButton: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "rgba(0, 0, 0, 0.38)"
  },
  enviarButton: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 1.25,
    color: "#03a9f4"
  },
  iconTextField: {
    color: "rgba(0, 0, 0, 0.54)",
    textAlign: "center",
    fontSize: 24
  }
});
