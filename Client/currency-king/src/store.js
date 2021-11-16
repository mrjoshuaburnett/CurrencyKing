import Vue from "vue";
import Vuex from "vuex";
import route from "./router.js";
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    showLoader: false,
    passwordResetModalVisible: false,
    messageTitle: "",
    messageContent: "",
    messageType: "",
    messageHtml: false,
    messageBoxVisible: false,
    isAuthorised: false,
    initialLoad: true,
    userId: null,
    fullName: null,
    role: null,
    allCurrencyDescriptions: {
      AED: "United Arab Emirates Dirham",
      AFN: "Afghanistan Afghani",
      ALL: "Albania Lek",
      AMD: "Armenia Dram",
      ANG: "Netherlands Antilles Guilder",
      AOA: "Angola Kwanza",
      ARS: "Argentina Peso",
      AUD: "Australia Dollar",
      AWG: "Aruba Guilder",
      AZN: "Azerbaijan Manat",
      BAM: "Bosnia and Herzegovina Convertible Mark",
      BBD: "Barbados Dollar",
      BDT: "Bangladesh Taka",
      BGN: "Bulgaria Lev",
      BHD: "Bahrain Dinar",
      BMD: "Bermuda Dollar",
      BND: "Brunei Darussalam Dollar",
      BOB: "Bolivia Bolíviano",
      BRL: "Brazil Real",
      BSD: "Bahamas Dollar",
      BTN: "Bhutan Ngultrum",
      BWP: "Botswana Pula",
      BYN: "Belarus Ruble",
      BZD: "Belize Dollar",
      CAD: "Canada Dollar",
      CDF: "Congo/Kinshasa Franc",
      CHF: "Switzerland Franc",
      CLP: "Chile Peso",
      CNY: "China Yuan Renminbi",
      COP: "Colombia Peso",
      CRC: "Costa Rica Colon",
      CUC: "Cuba Convertible Peso",
      CUP: "Cuba Peso",
      CVE: "Cape Verde Escudo",
      CZK: "Czech Republic Koruna",
      DJF: "Djibouti Franc",
      DKK: "Denmark Krone",
      DOP: "Dominican Republic Peso",
      DZD: "Algeria Dinar",
      EGP: "Egypt Pound",
      ERN: "Eritrea Nakfa",
      ETB: "Ethiopia Birr",
      EUR: "Euro Member Countries",
      FJD: "Fiji Dollar",
      FKP: "Falkland Islands (Malvinas) Pound",
      GBP: "United Kingdom Pound",
      GEL: "Georgia Lari",
      GGP: "Guernsey Pound",
      GHS: "Ghana Cedi",
      GIP: "Gibraltar Pound",
      GMD: "Gambia Dalasi",
      GNF: "Guinea Franc",
      GTQ: "Guatemala Quetzal",
      GYD: "Guyana Dollar",
      HKD: "Hong Kong Dollar",
      HNL: "Honduras Lempira",
      HRK: "Croatia Kuna",
      HTG: "Haiti Gourde",
      HUF: "Hungary Forint",
      IDR: "Indonesia Rupiah",
      ILS: "Israel Shekel",
      IMP: "Isle of Man Pound",
      INR: "India Rupee",
      IQD: "Iraq Dinar",
      IRR: "Iran Rial",
      ISK: "Iceland Krona",
      JEP: "Jersey Pound",
      JMD: "Jamaica Dollar",
      JOD: "Jordan Dinar",
      JPY: "Japan Yen",
      KES: "Kenya Shilling",
      KGS: "Kyrgyzstan Som",
      KHR: "Cambodia Riel",
      KMF: "Comorian Franc",
      KPW: "Korea (North) Won",
      KRW: "Korea (South) Won",
      KWD: "Kuwait Dinar",
      KYD: "Cayman Islands Dollar",
      KZT: "Kazakhstan Tenge",
      LAK: "Laos Kip",
      LBP: "Lebanon Pound",
      LKR: "Sri Lanka Rupee",
      LRD: "Liberia Dollar",
      LSL: "Lesotho Loti",
      LYD: "Libya Dinar",
      MAD: "Morocco Dirham",
      MDL: "Moldova Leu",
      MGA: "Madagascar Ariary",
      MKD: "Macedonia Denar",
      MMK: "Myanmar (Burma) Kyat",
      MNT: "Mongolia Tughrik",
      MOP: "Macau Pataca",
      MRU: "Mauritania Ouguiya",
      MUR: "Mauritius Rupee",
      MVR: "Maldives (Maldive Islands) Rufiyaa",
      MWK: "Malawi Kwacha",
      MXN: "Mexico Peso",
      MYR: "Malaysia Ringgit",
      MZN: "Mozambique Metical",
      NAD: "Namibia Dollar",
      NGN: "Nigeria Naira",
      NIO: "Nicaragua Cordoba",
      NOK: "Norway Krone",
      NPR: "Nepal Rupee",
      NZD: "New Zealand Dollar",
      OMR: "Oman Rial",
      PAB: "Panama Balboa",
      PEN: "Peru Sol",
      PGK: "Papua New Guinea Kina",
      PHP: "Philippines Peso",
      PKR: "Pakistan Rupee",
      PLN: "Poland Zloty",
      PYG: "Paraguay Guarani",
      QAR: "Qatar Riyal",
      RON: "Romania Leu",
      RSD: "Serbia Dinar",
      RUB: "Russia Ruble",
      RWF: "Rwanda Franc",
      SAR: "Saudi Arabia Riyal",
      SBD: "Solomon Islands Dollar",
      SCR: "Seychelles Rupee",
      SDG: "Sudan Pound",
      SEK: "Sweden Krona",
      SGD: "Singapore Dollar",
      SHP: "Saint Helena Pound",
      SLL: "Sierra Leone Leone",
      SOS: "Somalia Shilling",
      SPL: "Seborga Luigino",
      SRD: "Suriname Dollar",
      STN: "São Tomé and Príncipe Dobra",
      SVC: "El Salvador Colon",
      SYP: "Syria Pound",
      SZL: "eSwatini Lilangeni",
      THB: "Thailand Baht",
      TJS: "Tajikistan Somoni",
      TMT: "Turkmenistan Manat",
      TND: "Tunisia Dinar",
      TOP: "Tonga Pa'anga",
      TRY: "Turkey Lira",
      TTD: "Trinidad and Tobago Dollar",
      TVD: "Tuvalu Dollar",
      TWD: "Taiwan New Dollar",
      TZS: "Tanzania Shilling",
      UAH: "Ukraine Hryvnia",
      UGX: "Uganda Shilling",
      USD: "United States Dollar",
      UYU: "Uruguay Peso",
      UZS: "Uzbekistan Som",
      VEF: "Venezuela Bolívar",
      VND: "Viet Nam Dong",
      VUV: "Vanuatu Vatu",
      WST: "Samoa Tala",
      XAF: "Communauté Financière Africaine (BEAC) CFA Franc BEAC",
      XCD: "East Caribbean Dollar",
      XDR: "International Monetary Fund (IMF) Special Drawing Rights",
      XOF: "Communauté Financière Africaine (BCEAO) Franc",
      XPF: "Comptoirs Français du Pacifique (CFP) Franc",
      YER: "Yemen Rial",
      ZAR: "South Africa Rand",
      ZMW: "Zambia Kwacha",
      ZWD: "Zimbabwe Dollar",
    },
    allCurrencySymbols: {
      ALL: "Lek",
      AFN: "؋",
      ARS: "$",
      AWG: "ƒ",
      AUD: "$",
      AZN: "₼",
      BSD: "$",
      BBD: "$",
      BYN: "Br",
      BZD: "BZ$",
      BMD: "$",
      BOB: "$b",
      BAM: "KM",
      BWP: "P",
      BGN: "лв",
      BRL: "R$",
      BND: "$",
      KHR: "៛",
      CAD: "$",
      KYD: "$",
      CLP: "$",
      CNY: "¥",
      COP: "$",
      CRC: "₡",
      HRK: "kn",
      CUP: "₱",
      CZK: "Kč",
      DKK: "kr",
      DOP: "RD$",
      XCD: "$",
      EGP: "£",
      SVC: "$",
      EUR: "€",
      FKP: "£",
      FJD: "$",
      GHS: "¢",
      GIP: "£",
      GTQ: "Q",
      GGP: "£",
      GYD: "$",
      HNL: "L",
      HKD: "$",
      HUF: "Ft",
      ISK: "kr",
      INR: "₹",
      IDR: "Rp",
      IRR: "﷼",
      IMP: "£",
      ILS: "₪",
      JMD: "J$",
      JPY: "¥",
      JEP: "£",
      KZT: "лв",
      KPW: "₩",
      KRW: "₩",
      KGS: "лв",
      LAK: "₭",
      LBP: "£",
      LRD: "$",
      MKD: "ден",
      MYR: "RM",
      MUR: "₨",
      MXN: "$",
      MNT: "₮",
      MZN: "MT",
      NAD: "$",
      NPR: "₨",
      ANG: "ƒ",
      NZD: "$",
      NIO: "C$",
      NGN: "₦",
      NOK: "kr",
      OMR: "﷼",
      PKR: "₨",
      PAB: "B/.",
      PYG: "Gs",
      PEN: "S/.",
      PHP: "₱",
      PLN: "zł",
      QAR: "﷼",
      RON: "lei",
      RUB: "₽",
      SHP: "£",
      SAR: "﷼",
      RSD: "Дин.",
      SCR: "₨",
      SGD: "$",
      SBD: "$",
      SOS: "S",
      ZAR: "R",
      LKR: "₨",
      SEK: "kr",
      CHF: "CHF",
      SRD: "$",
      SYP: "£",
      TWD: "NT$",
      THB: "฿",
      TTD: "TT$",
      TRY: "₺",
      TVD: "$",
      UAH: "₴",
      GBP: "£",
      USD: "$",
      UYU: "$U",
      UZS: "лв",
      VEF: "Bs",
      VND: "₫",
      YER: "﷼",
      ZWD: "Z$",
    },
    commonCurrencies: ["USD", "GBP", "EUR", "JPY", "NZD", "AUD", "CAD", "CHF"],
    latestExchangeRates: null,
  },
  mutations: {
    setLoadingAnimation(state, val) {
      state.showLoader = val;
    },
    setPasswordResetModalVisible(state, val) {
      state.passwordResetModalVisible = val;
    },
    setMessage(state, val) {
      state.messageTitle = val.title;
      state.messageType = val.type;
      state.messageContent = val.content;
      state.messageHtml = val.html;
      state.messageBoxVisible = true;
    },
    setInitialLoad(state, val) {
      state.initialLoad = false;
    },
    setUserData(state, val) {
      state.userId = val.id;
      state.role = val.role;
      state.fullName = val.fullName;
      state.isAuthorised = true;
    },
    clearUserData(state) {
      state.userId = null;
      state.role = null;
      state.fullName = null;
      state.isAuthorised = false;
    },
    setLatestExchangeRates(state, val) {
      state.exchangeRateDate = formatDate(new Date(), true);
      state.latestExchangeRates = val;
    },
  },
  actions: {
    async getRequest({ commit, dispatch }, data) {
      const url = data.method ? `/${data.controller}/${data.method}` : `/${data.controller}`;

      return axios
        .get(url, {
          params: data.parameters,
        })
        .catch((error) => {});
    },

    async postRequest({ commit }, data) {
      var url = `/${data.controller}/${data.method}`;
      var formData = new FormData();
      if (data.form) {
        for (var key in data.parameters) {
          if (data.parameters.hasOwnProperty(key)) {
            formData.append(key, data.parameters[key]);
          }
        }
      }
      let response = await axios
        .post(url, data.form ? formData : data.parameters)
        .then(function (response) {
          if (response.data) {
            return response.data;
          } else if (response.success === false) {
            return {
              success: false,
              message: response.Message,
            };
          } else {
            return true;
          }
        })
        .catch((error) => {
          const response = error.response;
          if (response.status == 500) {
            if (response.data.Message) {
              if (data.returnError) {
                return {
                  error: true,
                  message: response.data.Message,
                };
              } else {
                commit("setMessage", {
                  title: "Error",
                  type: "warning",
                  content: response.data.Message,
                });
              }
            }
          }

          return null;
        });
      return response;
    },

    async authenticate({ commit }) {
      commit("setInitialLoad");
      var baseUrl = process.env.VUE_APP_API_URL;
      var url = `${baseUrl}/login/authenticate`;
      let success = await axios
        .get(url)
        .then(function (response) {
          if (response.data.id && response.data.role && response.data.fullName) {
            store.commit("setLoadingAnimation", false);
            commit("setUserData", response.data);

            return true;
          } else {
            return store.dispatch("onNotAuthenticated");
          }
        })
        .catch(() => {
          return store.dispatch("onNotAuthenticated");
        });
      return success;
    },

    async onNotAuthenticated({ commit }) {
      return false;
    },
    async logout({ commit }) {
      store.commit("setLoadingAnimation", true);
      var baseUrl = process.env.VUE_APP_API_URL;
      commit("clearUserData");
      let response = await axios.get(`${baseUrl}/login/logout`).catch(() => {
        commit("clearToken");
        route.push({
          name: "landing",
          params: {
            redirect: true,
          },
        });
      });

      route.push({
        path: "/login",
        params: {
          redirect: true,
        },
      });
      store.commit("setLoadingAnimation", false);
    },
    async getRequestExternal({ commit, dispatch }, url) {
      return axios.get(url, { withCredentials: false }).catch((error) => {});
    },
  },
  getters: {},
});
export default store;
