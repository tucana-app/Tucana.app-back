"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Rides", [
      // Ride #1
      {
        DriverId: 3,
        origin: JSON.stringify({
          city: "Sámara",
          province: "Guanacaste",
          address: "Guanacaste Province, Sámara, Costa Rica",
          latLng: {
            lat: 9.8820222,
            lng: -85.5290361,
          },
          details: {
            address_components: [
              {
                long_name: "Sámara",
                short_name: "Sámara",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Guanacaste Province, Sámara, Costa Rica",
            geometry: {
              bounds: {
                south: 9.8766989,
                west: -85.5323626,
                north: 9.8843937,
                east: -85.5134367,
              },
              location: {
                lat: 9.8820222,
                lng: -85.5290361,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.8766989,
                west: -85.5323626,
                north: 9.8843937,
                east: -85.5134367,
              },
            },
            place_id: "ChIJI1IHqgOqn48RxK8xGSlmLkQ",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Tumbas",
          province: "San José",
          address: "Tumbas, San José Province, Pérez Zeledón, Costa Rica",
          latLng: {
            lat: 9.2852104,
            lng: -83.8137418,
          },
          details: {
            address_components: [
              {
                long_name: "Pérez Zeledón",
                short_name: "Pérez Zeledón",
                types: ["administrative_area_level_2", "political"],
              },
              {
                long_name: "San José",
                short_name: "San José Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "San José Province, Pérez Zeledón, Costa Rica",
            geometry: {
              bounds: {
                south: 9.0680257,
                west: -83.995285,
                north: 9.5727367,
                east: -83.4157562,
              },
              location: {
                lat: 9.2852104,
                lng: -83.8137418,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.0680257,
                west: -83.995285,
                north: 9.5727367,
                east: -83.4157562,
              },
            },
            partial_match: true,
            place_id: "ChIJm5e09CROoY8R_4jlBTygm1c",
            types: ["administrative_area_level_2", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() - 5)),
        seatsAvailable: 2,
        seatsLeft: 2,
        comment: "Passing by Ruta 27 and San Jose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #2
      {
        DriverId: 4,
        origin: JSON.stringify({
          city: "Limon",
          province: "Limón",
          address: "Limón Province, Limon, Costa Rica",
          latLng: {
            lat: 9.9913106,
            lng: -83.04150779999999,
          },
          details: {
            address_components: [
              {
                long_name: "Limon",
                short_name: "Limon",
                types: ["locality", "political"],
              },
              {
                long_name: "Limón Province",
                short_name: "Limón Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Limón Province, Limon, Costa Rica",
            geometry: {
              bounds: {
                south: 9.9721473,
                west: -83.06642529999999,
                north: 10.0114533,
                east: -83.0191327,
              },
              location: {
                lat: 9.9913106,
                lng: -83.04150779999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.9721473,
                west: -83.06642529999999,
                north: 10.0114533,
                east: -83.0191327,
              },
            },
            place_id: "ChIJA9lQcTYFp48RX4EMBf1k2CQ",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Puerto Viejo de Talamanca",
          province: "Limón",
          address: "Limón Province, Puerto Viejo de Talamanca, Costa Rica",
          latLng: {
            lat: 9.6540146,
            lng: -82.75494119999999,
          },
          details: {
            address_components: [
              {
                long_name: "Puerto Viejo de Talamanca",
                short_name: "Puerto Viejo de Talamanca",
                types: ["locality", "political"],
              },
              {
                long_name: "Limón Province",
                short_name: "Limón Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address:
              "Limón Province, Puerto Viejo de Talamanca, Costa Rica",
            geometry: {
              bounds: {
                south: 9.645875199999999,
                west: -82.7649879,
                north: 9.6600059,
                east: -82.7411485,
              },
              location: {
                lat: 9.6540146,
                lng: -82.75494119999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.645875199999999,
                west: -82.7649879,
                north: 9.6600059,
                east: -82.7411485,
              },
            },
            place_id: "ChIJFd-e6wxQpo8RRbmWoq2O61M",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 15)),
        seatsAvailable: 6,
        seatsLeft: 6,
        comment: "Diamante valley",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #3
      {
        DriverId: 1,
        origin: JSON.stringify({
          city: "Uvita",
          province: "Puntarenas",
          address: "Puntarenas Province, Uvita, Costa Rica",
          latLng: {
            lat: 9.163500899999999,
            lng: -83.7358514,
          },
          details: {
            address_components: [
              {
                long_name: "Uvita",
                short_name: "Uvita",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Puntarenas Province, Uvita, Costa Rica",
            geometry: {
              bounds: {
                south: 9.149214599999999,
                west: -83.7493801,
                north: 9.177431499999999,
                east: -83.7267208,
              },
              location: {
                lat: 9.163500899999999,
                lng: -83.7358514,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.149214599999999,
                west: -83.7493801,
                north: 9.177431499999999,
                east: -83.7267208,
              },
            },
            place_id: "ChIJkUhH1JdXoY8RJ5-enAIQ6jk",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Barucito",
          province: "San José",
          address: "San José Province, Barucito, Costa Rica",
          latLng: {
            lat: 9.247745,
            lng: -83.80459599999999,
          },
          details: {
            address_components: [
              {
                long_name: "Barucito",
                short_name: "Barucito",
                types: ["locality", "political"],
              },
              {
                long_name: "San José",
                short_name: "San José",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "San José, Barucito, Costa Rica",
            geometry: {
              location: {
                lat: 9.247745,
                lng: -83.80459599999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.246396019708499,
                west: -83.8059449802915,
                north: 9.249093980291503,
                east: -83.8032470197085,
              },
            },
            place_id: "ChIJLQMOrEpaoY8RUp434pF3FgY",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 2)),
        seatsAvailable: 3,
        seatsLeft: 1,
        comment: "Excited to meet you on my way!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #4
      {
        DriverId: 1,
        origin: JSON.stringify({
          city: "Dominical",
          province: "Puntarenas",
          address:
            "Dominical, Puntarenas Province, Savegre de Aguirre, Costa Rica",
          latLng: {
            lat: 9.252431099999999,
            lng: -83.85923059999999,
          },
          details: {
            address_components: [
              {
                long_name: "Dominical",
                short_name: "Dominical",
                types: ["neighborhood", "political"],
              },
              {
                long_name: "Savegre de Aguirre",
                short_name: "Savegre de Aguirre",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address:
              "Dominical, Puntarenas Province, Savegre de Aguirre, Costa Rica",
            geometry: {
              bounds: {
                south: 9.244193899999999,
                west: -83.86671059999999,
                north: 9.2587649,
                east: -83.8510036,
              },
              location: {
                lat: 9.252431099999999,
                lng: -83.85923059999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.244193899999999,
                west: -83.86671059999999,
                north: 9.2587649,
                east: -83.8510036,
              },
            },
            place_id: "ChIJEeqbbG1coY8R81YBWUfLIUA",
            types: ["neighborhood", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Nosara",
          province: "Guanacaste",
          address: "Guanacaste Province, Nosara, Costa Rica",
          latLng: {
            lat: 9.9797332,
            lng: -85.64862509999999,
          },
          details: {
            address_components: [
              {
                long_name: "Nosara",
                short_name: "Nosara",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste Province",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Guanacaste Province, Nosara, Costa Rica",
            geometry: {
              bounds: {
                south: 9.964792899999999,
                west: -85.67314619999999,
                north: 9.9897723,
                east: -85.6356382,
              },
              location: {
                lat: 9.9797332,
                lng: -85.64862509999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.964792899999999,
                west: -85.67314619999999,
                north: 9.9897723,
                east: -85.6356382,
              },
            },
            place_id: "ChIJuWQfhpBTno8RXxxI5DR2x_0",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() - 8)),
        seatsAvailable: 4,
        seatsLeft: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #5
      {
        DriverId: 2,
        origin: JSON.stringify({
          city: "Tamarindo",
          province: "Guanacaste",
          address: "Guanacaste Province, Tamarindo, Costa Rica",
          latLng: {
            lat: 10.2992746,
            lng: -85.83710579999999,
          },
          details: {
            address_components: [
              {
                long_name: "Tamarindo",
                short_name: "Tamarindo",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste Province",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Guanacaste Province, Tamarindo, Costa Rica",
            geometry: {
              bounds: {
                south: 10.2911982,
                west: -85.8458375,
                north: 10.310579,
                east: -85.8303023,
              },
              location: {
                lat: 10.2992746,
                lng: -85.83710579999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 10.2911982,
                west: -85.8458375,
                north: 10.310579,
                east: -85.8303023,
              },
            },
            place_id: "ChIJD8MDkkA5no8Rk_jBLF6fGLs",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Liberia",
          province: "Guanacaste",
          address: "Guanacaste Province, Liberia, Costa Rica",
          latLng: {
            lat: 10.6345964,
            lng: -85.4406747,
          },
          details: {
            address_components: [
              {
                long_name: "Liberia",
                short_name: "Liberia",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste Province",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Guanacaste Province, Liberia, Costa Rica",
            geometry: {
              bounds: {
                south: 10.597466,
                west: -85.46324729999999,
                north: 10.66162,
                east: -85.41509630000002,
              },
              location: {
                lat: 10.6345964,
                lng: -85.4406747,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 10.597466,
                west: -85.46324729999999,
                north: 10.66162,
                east: -85.41509630000002,
              },
            },
            place_id: "ChIJ5Qgciip9dY8Rk4M2-5Sk-LI",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 3)),
        seatsAvailable: 5,
        seatsLeft: 5,
        comment: "I have a lot of seats available if you need",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #6
      {
        DriverId: 4,
        origin: JSON.stringify({
          city: "Escazu",
          province: "San José",
          address: "San José Province, Escazu, Costa Rica",
          latLng: {
            lat: 9.920695,
            lng: -84.14615189999999,
          },
          details: {
            address_components: [
              {
                long_name: "Escazu",
                short_name: "Escazu",
                types: ["locality", "political"],
              },
              {
                long_name: "San José Province",
                short_name: "San José Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "San José Province, Escazu, Costa Rica",
            geometry: {
              bounds: {
                south: 9.909808199999999,
                west: -84.16087929999999,
                north: 9.9278937,
                east: -84.1301518,
              },
              location: {
                lat: 9.920695,
                lng: -84.14615189999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.909808199999999,
                west: -84.16087929999999,
                north: 9.9278937,
                east: -84.1301518,
              },
            },
            place_id: "ChIJ6Q-4_4n8oI8RLUEjx4LH-yQ",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Puerto Carrillo",
          province: "Guanacaste",
          address: "Guanacaste Province, Carrillo, Costa Rica",
          latLng: {
            lat: 9.868858,
            lng: -85.48138349999999,
          },
          details: {
            address_components: [
              {
                long_name: "Puerto Carrillo",
                short_name: "Puerto Carrillo",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste Province",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address:
              "Guanacaste Province, Puerto Carrillo, Costa Rica",
            geometry: {
              bounds: {
                south: 9.8623194,
                west: -85.4873657,
                north: 9.873692799999999,
                east: -85.4731607,
              },
              location: {
                lat: 9.868858,
                lng: -85.48138349999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.8623194,
                west: -85.4873657,
                north: 9.873692799999999,
                east: -85.4731607,
              },
            },
            place_id: "ChIJMVQ1xXkHn48RlloSJ_P-v6g",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 16)),
        seatsAvailable: 1,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #7
      {
        DriverId: 2,
        origin: JSON.stringify({
          city: "Tarcoles",
          province: "Puntarenas",
          address: "Puntarenas Province, Tarcoles, Costa Rica",
          latLng: {
            lat: 9.7730312,
            lng: -84.6295991,
          },
          details: {
            address_components: [
              {
                long_name: "Tarcoles",
                short_name: "Tarcoles",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Puntarenas Province, Tarcoles, Costa Rica",
            geometry: {
              bounds: {
                south: 9.752412399999999,
                west: -84.6388865,
                north: 9.7832442,
                east: -84.62240709999999,
              },
              location: {
                lat: 9.7730312,
                lng: -84.6295991,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.752412399999999,
                west: -84.6388865,
                north: 9.7832442,
                east: -84.62240709999999,
              },
            },
            place_id: "ChIJK6DhS4rJoY8RJ_dRPU1yUoc",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Santa Teresa Beach",
          province: "Puntarenas",
          address: "Santa Teresa Beach, Puntarenas Province, Costa Rica",
          latLng: {
            lat: 9.6463176,
            lng: -85.1673785,
          },
          details: {
            address_components: [
              {
                long_name: "Santa Teresa Beach",
                short_name: "Santa Teresa Beach",
                types: ["political", "sublocality", "sublocality_level_1"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address:
              "Santa Teresa Beach, Puntarenas Province, Costa Rica",
            geometry: {
              bounds: {
                south: 9.6349381,
                west: -85.1816367,
                north: 9.6564731,
                east: -85.15605939999999,
              },
              location: {
                lat: 9.6463176,
                lng: -85.1673785,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.6349381,
                west: -85.1816367,
                north: 9.6564731,
                east: -85.15605939999999,
              },
            },
            place_id: "ChIJOy2b519un48RhY0NoTvQ1h8",
            types: ["political", "sublocality", "sublocality_level_1"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() - 4)),
        seatsAvailable: 1,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #8
      {
        DriverId: 3,
        origin: JSON.stringify({
          city: "Jaco",
          province: "Puntarenas",
          address: "Puntarenas Province, Jaco, Costa Rica",
          latLng: {
            lat: 9.6202396,
            lng: -84.6217487,
          },
          details: {
            address_components: [
              {
                long_name: "Jaco",
                short_name: "Jaco",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Puntarenas Province, Jaco, Costa Rica",
            geometry: {
              bounds: {
                south: 9.5955029,
                west: -84.64287759999999,
                north: 9.636122900000002,
                east: -84.6093177,
              },
              location: {
                lat: 9.6202396,
                lng: -84.6217487,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.5955029,
                west: -84.64287759999999,
                north: 9.636122900000002,
                east: -84.6093177,
              },
            },
            place_id: "ChIJgwxhuWrHoY8R9t2Ppf9-8xs",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Quepos",
          province: "Puntarenas",
          address: "Puntarenas Province, Quepos, Costa Rica",
          latLng: {
            lat: 9.431868099999999,
            lng: -84.16190759999999,
          },
          details: {
            address_components: [
              {
                long_name: "Quepos",
                short_name: "Quepos",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Puntarenas Province, Quepos, Costa Rica",
            geometry: {
              bounds: {
                south: 9.3464312,
                west: -84.2543651,
                north: 9.571805699999999,
                east: -84.0254974,
              },
              location: {
                lat: 9.431868099999999,
                lng: -84.16190759999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.3464312,
                west: -84.2543651,
                north: 9.571805699999999,
                east: -84.0254974,
              },
            },
            place_id: "ChIJkfs8OMVzoY8RcUMedtc7BDM",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        seatsAvailable: 3,
        seatsLeft: 0,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Ride #9
      {
        DriverId: 2,
        origin: JSON.stringify({
          city: "La Fortuna",
          province: "Alajuela",
          address: "Alajuela Province, La Fortuna, Costa Rica",
          latLng: {
            lat: 10.4678335,
            lng: -84.64268059999999,
          },
          details: {
            address_components: [
              {
                long_name: "La Fortuna",
                short_name: "La Fortuna",
                types: ["locality", "political"],
              },
              {
                long_name: "Alajuela Province",
                short_name: "Alajuela Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Alajuela Province, La Fortuna, Costa Rica",
            geometry: {
              bounds: {
                south: 10.4606771,
                west: -84.6542071,
                north: 10.4792034,
                east: -84.6265696,
              },
              location: {
                lat: 10.4678335,
                lng: -84.64268059999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 10.4606771,
                west: -84.6542071,
                north: 10.4792034,
                east: -84.6265696,
              },
            },
            place_id: "ChIJmelgBokMoI8R5ixX0nuo42k",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Santo Domingo",
          province: "Heredia",
          address: "Heredia Province, Santo Domingo, Costa Rica",
          latLng: {
            lat: 9.980723399999999,
            lng: -84.0909289,
          },
          details: {
            address_components: [
              {
                long_name: "Santo Domingo",
                short_name: "Santo Domingo",
                types: ["locality", "political"],
              },
              {
                long_name: "Heredia Province",
                short_name: "Heredia Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Heredia Province, Santo Domingo, Costa Rica",
            geometry: {
              bounds: {
                south: 9.9747785,
                west: -84.0950793,
                north: 9.9842382,
                east: -84.08667319999999,
              },
              location: {
                lat: 9.980723399999999,
                lng: -84.0909289,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.9747785,
                west: -84.0950793,
                north: 9.9842382,
                east: -84.08667319999999,
              },
            },
            place_id: "ChIJf6EoYt_koI8R0OlnyT25pVw",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 6)),
        seatsAvailable: 5,
        seatsLeft: 5,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 1,
        origin: JSON.stringify({
          city: "La Fortuna",
          province: "Alajuela",
          address: "Alajuela Province, La Fortuna, Costa Rica",
          latLng: {
            lat: 10.4678335,
            lng: -84.64268059999999,
          },
          details: {
            address_components: [
              {
                long_name: "La Fortuna",
                short_name: "La Fortuna",
                types: ["locality", "political"],
              },
              {
                long_name: "Alajuela Province",
                short_name: "Alajuela Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Alajuela Province, La Fortuna, Costa Rica",
            geometry: {
              bounds: {
                south: 10.4606771,
                west: -84.6542071,
                north: 10.4792034,
                east: -84.6265696,
              },
              location: {
                lat: 10.4678335,
                lng: -84.64268059999999,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 10.4606771,
                west: -84.6542071,
                north: 10.4792034,
                east: -84.6265696,
              },
            },
            place_id: "ChIJmelgBokMoI8R5ixX0nuo42k",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Santo Domingo",
          province: "Heredia",
          address: "Heredia Province, Santo Domingo, Costa Rica",
          latLng: {
            lat: 9.980723399999999,
            lng: -84.0909289,
          },
          details: {
            address_components: [
              {
                long_name: "Santo Domingo",
                short_name: "Santo Domingo",
                types: ["locality", "political"],
              },
              {
                long_name: "Heredia Province",
                short_name: "Heredia Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Heredia Province, Santo Domingo, Costa Rica",
            geometry: {
              bounds: {
                south: 9.9747785,
                west: -84.0950793,
                north: 9.9842382,
                east: -84.08667319999999,
              },
              location: {
                lat: 9.980723399999999,
                lng: -84.0909289,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.9747785,
                west: -84.0950793,
                north: 9.9842382,
                east: -84.08667319999999,
              },
            },
            place_id: "ChIJf6EoYt_koI8R0OlnyT25pVw",
            types: ["locality", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        seatsAvailable: 5,
        seatsLeft: 5,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 3,
        origin: JSON.stringify({
          city: "Tarcoles",
          province: "Puntarenas",
          address: "Puntarenas Province, Tarcoles, Costa Rica",
          latLng: {
            lat: 9.7730312,
            lng: -84.6295991,
          },
          details: {
            address_components: [
              {
                long_name: "Tarcoles",
                short_name: "Tarcoles",
                types: ["locality", "political"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Puntarenas Province, Tarcoles, Costa Rica",
            geometry: {
              bounds: {
                south: 9.752412399999999,
                west: -84.6388865,
                north: 9.7832442,
                east: -84.62240709999999,
              },
              location: {
                lat: 9.7730312,
                lng: -84.6295991,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.752412399999999,
                west: -84.6388865,
                north: 9.7832442,
                east: -84.62240709999999,
              },
            },
            place_id: "ChIJK6DhS4rJoY8RJ_dRPU1yUoc",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Santa Teresa Beach",
          province: "Puntarenas",
          address: "Santa Teresa Beach, Puntarenas Province, Costa Rica",
          latLng: {
            lat: 9.6463176,
            lng: -85.1673785,
          },
          details: {
            address_components: [
              {
                long_name: "Santa Teresa Beach",
                short_name: "Santa Teresa Beach",
                types: ["political", "sublocality", "sublocality_level_1"],
              },
              {
                long_name: "Puntarenas Province",
                short_name: "Puntarenas Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address:
              "Santa Teresa Beach, Puntarenas Province, Costa Rica",
            geometry: {
              bounds: {
                south: 9.6349381,
                west: -85.1816367,
                north: 9.6564731,
                east: -85.15605939999999,
              },
              location: {
                lat: 9.6463176,
                lng: -85.1673785,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.6349381,
                west: -85.1816367,
                north: 9.6564731,
                east: -85.15605939999999,
              },
            },
            place_id: "ChIJOy2b519un48RhY0NoTvQ1h8",
            types: ["political", "sublocality", "sublocality_level_1"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        seatsAvailable: 2,
        seatsLeft: 2,
        comment: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        DriverId: 3,
        origin: JSON.stringify({
          city: "Sámara",
          province: "Guanacaste",
          address: "Guanacaste Province, Sámara, Costa Rica",
          latLng: {
            lat: 9.8820222,
            lng: -85.5290361,
          },
          details: {
            address_components: [
              {
                long_name: "Sámara",
                short_name: "Sámara",
                types: ["locality", "political"],
              },
              {
                long_name: "Guanacaste",
                short_name: "Guanacaste Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "Guanacaste Province, Sámara, Costa Rica",
            geometry: {
              bounds: {
                south: 9.8766989,
                west: -85.5323626,
                north: 9.8843937,
                east: -85.5134367,
              },
              location: {
                lat: 9.8820222,
                lng: -85.5290361,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.8766989,
                west: -85.5323626,
                north: 9.8843937,
                east: -85.5134367,
              },
            },
            place_id: "ChIJI1IHqgOqn48RxK8xGSlmLkQ",
            types: ["locality", "political"],
          },
        }),
        destination: JSON.stringify({
          city: "Tumbas",
          province: "San José",
          address: "Tumbas, San José Province, Pérez Zeledón, Costa Rica",
          latLng: {
            lat: 9.2852104,
            lng: -83.8137418,
          },
          details: {
            address_components: [
              {
                long_name: "Pérez Zeledón",
                short_name: "Pérez Zeledón",
                types: ["administrative_area_level_2", "political"],
              },
              {
                long_name: "San José",
                short_name: "San José Province",
                types: ["administrative_area_level_1", "political"],
              },
              {
                long_name: "Costa Rica",
                short_name: "CR",
                types: ["country", "political"],
              },
            ],
            formatted_address: "San José Province, Pérez Zeledón, Costa Rica",
            geometry: {
              bounds: {
                south: 9.0680257,
                west: -83.995285,
                north: 9.5727367,
                east: -83.4157562,
              },
              location: {
                lat: 9.2852104,
                lng: -83.8137418,
              },
              location_type: "APPROXIMATE",
              viewport: {
                south: 9.0680257,
                west: -83.995285,
                north: 9.5727367,
                east: -83.4157562,
              },
            },
            partial_match: true,
            place_id: "ChIJm5e09CROoY8R_4jlBTygm1c",
            types: ["administrative_area_level_2", "political"],
          },
        }),
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)),
        seatsAvailable: 2,
        seatsLeft: 2,
        comment: "Passing by Ruta 27 and San Jose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Rides", {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    });
  },
};
