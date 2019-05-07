import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Content, Container, Icon, Card, CardItem } from "native-base";
import UserInactivity from "react-native-user-inactivity";
import * as StringConstants from "../../../helpers/constants";
import gStyles from "../../globalStyles";
import FooterCancel from "../../../helpers/components/FooterCancel";
import HeaderGeneral from "../../../helpers/components/HeaderGeneral";
import ValesQuantityBox from "../../../helpers/components/Vales/ValesQuantityBox";
import ListVales from "../../../helpers/components/Vales/ListVales";
import ButtonRipple from "../../../helpers/components/ButtonRipple";
import ModalValesFilter from "../../../helpers/components/Vales/ModalValesFilter";
//linericons
import icoMoonConfig from "../../../../selection.json";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
const Linericon = createIconSetFromIcoMoon(
  icoMoonConfig,
  "icomoon",
  "icomoon.ttf"
);

const { width } = Dimensions.get("window");
const listValesConsumidos = [
  {
    numValeDisponible: 123456,
    numContrato: 1321312,
    fechaCompra: "20/03/19",
    valor: "$ 25.900",
    fechaConsumo: "19/04/19"
  },
  {
    numValeDisponible: 123456,
    numContrato: 1321312,
    fechaCompra: "20/03/19",
    valor: "$ 25.900",
    fechaConsumo: "19/04/19"
  },
  {
    numValeDisponible: 123456,
    numContrato: 1321312,
    fechaCompra: "20/03/19",
    valor: "$ 25.900",
    fechaConsumo: "19/04/19"
  }
];

export default class ValesConsumidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleBoxFilter: false,
      fechaDesde: "",
      fechaHasta: "",
      modalVisible: false
    };
  }

  onAction = active => {
    this.setState({
      active
    });
    if (!active && !this.state.blurScreen) {
      this.setState({ modalVisibleCiu: false });
      this.setState({ modalVisibleService: false });
      this.setState({ modalVisibleEspecialidad: false });
      this.setState({ showModal: false });
      if (this._menuPerfil) {
        this._menuPerfil.hide();
      }
      if (this._menuContratos) {
        this._menuContratos.hide();
      }
      this.props.navigation.navigate("Inactividad");
    }
  };

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  openFilterModal = () => {
    this.setState({ modalVisible: true });
  };

  closeFilterModal = () => {
    this.setState({ modalVisible: false });
  };

  onPressFilter = (fechaDesde, fechaHasta) => {
    this.closeFilterModal();
    this.setState({ isVisibleBoxFilter: true, fechaDesde, fechaHasta });
  };

  render() {
    return (
      <Container padder={false}>
        <UserInactivity
          timeForInactivity={StringConstants.TIME_INACTIVITY}
          onAction={this.onAction}
        >
          <Content bounces={false} padder={false} style={{ paddingTop: 0 }}>
            <View style={[gStyles.contentForm]}>
              <HeaderGeneral
                title={"Vales Consumidos"}
                isVisibleClose={"inactive"}
                onPressBack={this.onPressBack}
                floatIcon={
                  <Linericon
                    name="outline-account_balance_wallet-24px"
                    style={gStyles.iconHeaderGreen}
                  />
                }
              />
              <ValesQuantityBox title={"Vales Consumidos"} quantity={3} />
              {this.getBoxFilterView()}
              <ListVales
                type={"consumidos"}
                listValesDisponibles={listValesConsumidos}
                listTitle={"Vale consumido"}
              />
            </View>
          </Content>
        </UserInactivity>
        <ModalValesFilter
          modalVisible={this.state.modalVisible}
          closeModal={this.closeFilterModal}
          onPressFilter={this.onPressFilter}
          title={"PERIODO"}
        />
      </Container>
    );
  }
  getBoxFilterView() {
    const { isVisibleBoxFilter, fechaDesde, fechaHasta } = this.state;

    return (
      <View style={styles.buttonFilter}>
        <TouchableOpacity
          style={styles.innerButtonFilter}
          onPress={this.openFilterModal}
        >
          <Linericon
            name="outline-filter_list-24px"
            style={gStyles.iconFilter}
          />
          <Text style={styles.textFilter}>Filtro</Text>
        </TouchableOpacity>
        {isVisibleBoxFilter && (
          <View style={styles.viewBoxFilter}>
            <Text style={styles.textFilterDate}>
              {fechaDesde + " - " + fechaHasta}
            </Text>
            <Icon
              name="highlight-off"
              type="MaterialIcons"
              style={styles.iconChangeFilter}
              onPress={() => {
                this.setState({
                  isVisibleBoxFilter: false
                });
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonFilter: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "4%",
    marginTop: 20
  },
  innerButtonFilter: {
    flexDirection: "row",
    alignItems: "center"
  },
  textFilter: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    marginLeft: 3,
    letterSpacing: 0.1,
    color: "rgba(0, 0, 0, 0.6)"
  },
  viewBoxFilter: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: 12,
    marginLeft: 15
  },
  textFilterDate: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    letterSpacing: 1.25,
    color: "rgba(0, 0, 0, 0.38)",
    marginLeft: 16
  },
  iconChangeFilter: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: 15,
    marginRight: 8,
    marginLeft: 10,
    marginTop: 2
  }
});
