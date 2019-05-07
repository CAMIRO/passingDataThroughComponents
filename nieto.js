import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon, Item } from "native-base";
import Global from "../../screens/globalStyles";
import DatePicker from "react-native-datepicker";
import { DEVICE_LOCAL, MESSAGES, RULES } from "../../helpers/validator";
/////
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../../selection.json";
const Linericon = createIconSetFromIcoMoon(
  icoMoonConfig,
  "icomoon",
  "icomoon.ttf"
);

export default class DatePickerComponent extends Component {
  constructor(props) {
    super(props);

    this.setDate = this.setDate.bind(this);
    this.state = {
      isValidFechaDesde: false,
      errorFechaDesde: [],
      mainDate: props.mainDate,
      changeDate: false
    };
  }

  setDate = newDate => {
    var arrayDate = newDate.split("-");
    let dia = arrayDate[0];
    let mes = arrayDate[1];
    let ano = arrayDate[2];
    let mainDate = dia + "/" + mes + "/" + ano;
    this.setState({ changeDate: true });
    //Cuando la fecha cambia se envia esta al componente padre - ModalValesFilter
    this.props.onDateChange(mainDate);
  };

  TitleWhenPickIsEmpty() {
    return (
      <Text
        style={[
          Global.labelMisDatos,
          this.state.changeDate
            ? Global.colorIconMisdatos2
            : Global.colorIconMisdatos1
        ]}
      >
        DD/MM/AAAA
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.mainWrapper}>
        {this.TitleWhenPickIsEmpty()}
        <View
          style={[
            this.state.changeDate ? Global.bordechangeDate : Global.bordeB,

            Global.mb25,
            Global.itemAppear
          ]}
        >
          <Item last style={styles.ItemStyle}>
            <Text style={styles.Title}>
              {this.props.mainDate ? this.props.mainDate : "DD/MM/AAAA"}
            </Text>

            <View style={styles.WrapperDatePicker}>
              <DatePicker
                style={styles.tag}
                date={this.state.date}
                mode="date"
                placeholder={this.props.mainDate}
                value={this.props.mainDate}
                androidMode={"default"}
                hideText={true}
                showIcon={false}
                locale={"es"}
                format="DD-MM-YYYY"
                minDate="01-01-1700"
                maxDate={new Date()}
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                ref={picker => {
                  this.datePicker = picker;
                }}
                onDateChange={this.setDate}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: 5,
                    top: 4,
                    marginLeft: 0,
                    width: 24,
                    height: 24,
                    opacity: 0.5
                  },
                  dateInput: {
                    marginRight: 40,
                    marginLeft: 30,
                    borderWidth: 0,
                    alignItems: "flex-start",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: 16,
                    letterSpacing: 0.15,
                    color: "#000"
                  },
                  dateTouchBody: {
                    fontSize: 16,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: 16,
                    letterSpacing: 0.15,
                    color: "#000",
                    width: "100%"
                  },
                  dateText: {
                    fontSize: 16,
                    fontWeight: "bold",
                    fontStyle: "normal",
                    lineHeight: 16,
                    letterSpacing: 0.15,
                    color: "#000",
                    width: "100%"
                  }
                }}
              />
            </View>
            <Linericon
              active
              name="outline-event-24px"
              style={[
                Global.iconoMisdatos,
                this.state.changeDate
                  ? Global.colorIconMisdatos2
                  : Global.colorIconMisdatos1
              ]}
            />
          </Item>
        </View>
      </View>
    );
  }
}

DatePickerComponent.defaultProps = {
  deviceLocale: DEVICE_LOCAL,
  messages: MESSAGES,
  rules: RULES
};
const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: 15,
    marginHorizontal: "5%"
  },
  ItemStyle: {
    flexDirection: "row"
  },
  Title: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 16,
    letterSpacing: 0.15,
    color: "#000",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 5
  },
  WrapperDatePicker: {
    flex: 1
  },
  tag: {
    position: "relative",
    zIndex: 9,
    width: "100%"
  }
});
